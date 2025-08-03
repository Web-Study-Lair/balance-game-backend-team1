import { Injectable, NotFoundException } from '@nestjs/common';
import { BalanceGame } from './entity/balanceGame.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDto } from './DTO/CreateGameDto';
import { Choice } from './entity/choice.entity';
import { promises as fs } from 'fs';
import { join } from 'path';
import { emptyDir } from 'fs-extra'

@Injectable()
export class BalanceService {
    constructor(
        @InjectRepository(BalanceGame)
        private gameRepository: Repository<BalanceGame>,
        @InjectRepository(Choice)
        private choiceRepository: Repository<Choice>,
    ){}

    async findAll(): Promise<BalanceGame[]> {
        return await this.gameRepository.find();
    }

    async createGame(createGameDto: CreateGameDto, images: Express.Multer.File[]) {
        console.log('images:', images);
        // console.log('createGameDto:', createGameDto);
        // console.log('choices:', createGameDto.choices);
        const game = this.gameRepository.create({ title: createGameDto.title });
        await this.gameRepository.save(game);

        const choices: Choice[] = [];

        // console.log('images:', images);
        // console.log('images[0]:', images[0]);
        // console.log('images[1]:', images[1]);

        for (let i = 0; i < createGameDto.choices.length; i++) {
            const createChoiceDto = createGameDto.choices[i];
            const imageFile = images[i];

            const imagePath = imageFile ? imageFile.path : null;

            const choice = this.choiceRepository.create({
                id: i + 1,
                description: createChoiceDto.description,
                imageUrl: imagePath,
                balanceGame: game,
            });

            choices.push(choice);
        }
        await this.choiceRepository.save(choices);
        return { gameId: game.id}
    };

    async deleteGameById(id: number): Promise<{ message: string}> {
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

    async deleteAll() {
        const allGames = await this.gameRepository.find();
        await this.gameRepository.remove(allGames);

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
