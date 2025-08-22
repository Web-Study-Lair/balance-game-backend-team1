import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { BalanceGame } from './entity/balanceGame.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDto } from './DTO/CreateGameDto';
import { Choice } from './entity/choice.entity';
import { promises as fs } from 'fs';
import { join } from 'path';
import { emptyDir } from 'fs-extra'
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class BalanceService implements OnModuleInit{
    private cachedGameIds: number[] = [];
    private usedGameIds: number[] = [];

    constructor(
        @InjectRepository(BalanceGame)
        private gameRepository: Repository<BalanceGame>,
        private schedulerRegistry: SchedulerRegistry,
        @InjectRepository(Choice)
        private choiceRepository: Repository<Choice>,
    ) {}

    async onModuleInit() {
        await this.refreshGameIdCache();
        this.setCacheRefresh();
    }

    //isActive가 true인 게임 ID만 추출
    private async refreshGameIdCache(): Promise<void> {
        const activeGames = await this.gameRepository.find({
            where: { isActive: true },
            select: ['id'],
        });

        this.cachedGameIds = activeGames.map(game => game.id);
        this.usedGameIds.length = 0;
    }

    private setCacheRefresh() {
        const interval = setInterval(async () => {
            await this.refreshGameIdCache();
        }, 5 * 60 * 1000);
        this.schedulerRegistry.addInterval('gameCacheRefresh', interval);
    }
    
    //게임 목록 캐시(중복 방지넣었음)
    private getRandomUnusedGameId(): number | null {
        const availableIds = this.cachedGameIds.filter(id => !this.usedGameIds.includes(id));
        console.log('avail : ', availableIds);
        if (availableIds.length === 0) {
            this.usedGameIds.length = 0;
            return null;
        }
        const randomIndex = Math.floor(Math.random() * availableIds.length);
        const selectedId = availableIds[randomIndex];
        this.usedGameIds.push(selectedId);
        return selectedId;
    }

    // 외부 제공 함수
    async getGame(): Promise<BalanceGame | null> {
        console.log('Unused : ', this.cachedGameIds);
        console.log('Used : ', this.usedGameIds);

        const id = this.getRandomUnusedGameId();
        console.log('id', id);
        if (!id) return null;



        return await this.gameRepository.findOne({
            where: { id },
            relations: ['choices'],
        });
    }



    async findAll(): Promise<BalanceGame[]> {
        return await this.gameRepository.find();
    }


    //밸런스 게임 추가 부분! (메인)
    async createGame(createGameDto: CreateGameDto, images1: Express.Multer.File, images2: Express.Multer.File) {

        console.log('createGameDto:', createGameDto);
        // console.log('choices:', createGameDto.choices);
        const game = this.gameRepository.create({ title: createGameDto.title });
        await this.gameRepository.save(game);
        this.cachedGameIds.push(game.id)

        const choices: Choice[] = [];

        const imagePath1 = images1?.path ?? null;
        const imagePath2 = images2?.path ?? null;

        //선택지 1
        const choice1 = this.choiceRepository.create({
            id: 1,
            description: createGameDto.choices[0]?.description || '',
            imageUrl: imagePath1,
            balanceGame: game,
        });
        choices.push(choice1);

        //선택지 2
        const choice2 = this.choiceRepository.create({
            id: 2,
            description: createGameDto.choices[1]?.description || '',
            imageUrl: imagePath2,
            balanceGame: game,
        });
        choices.push(choice2);


        await this.choiceRepository.save(choices);
        return { gameId: game.id}
    };

    async deleteGameById(id: number): Promise<{ message: string}> {

        this.cachedGameIds = this.cachedGameIds.filter(num => num !== id);
        const game = await this.gameRepository.findOne({ where: { id } });

        if (!game) {
            throw new NotFoundException('해당 id의 게임이 존재하지 않습니다.');
        }

        for (const choice of game.choices) {
            if (choice.imageUrl) {
                const filePath = join(process.cwd(), choice.imageUrl); // 절대경로로 변환
                console.log(filePath)
            try {
                await fs.unlink(filePath);
            } catch (error) {
        // 파일이 없거나 삭제 실패해도 무시하거나 로그 남기기
            console.warn(`Failed to delete file: ${filePath}`, error);
            }
        }   
    }

        await this.gameRepository.remove(game);

        return { message: `${id} 번 게임이 삭제되었습니다.`};
    }

    // 밸런스 게임 전체 삭제
    async deleteAll() {
        const allGames = await this.gameRepository.find();
        await this.gameRepository.remove(allGames);
        this.cachedGameIds.length = 0;
        
        // Imshr
        const ImagesDir = join(process.cwd(), 'uploadImages');

            try {
                await emptyDir(ImagesDir);
                console.log('이미지 폴더 정리 완료.')
                } catch (error) {
                    console.error('이미지 전체 삭제 실패:', error);

            return { message: '모든 밸런스게임이 삭제되었습니다.'};
        }
    }
}
