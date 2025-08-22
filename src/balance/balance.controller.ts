import { Body, Controller, Delete, Get, NotFoundException, Param, PayloadTooLargeException, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateGameDto } from './DTO/CreateGameDto';
import { CreateChoiceDto } from './DTO/CreateChoiceDto';
import { BalanceService } from './balance.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/config/multer.config';

@Controller('balanceGame')
export class BalanceController {
    constructor(private readonly balanceService: BalanceService) {}

    @Post('upload')
    @UseInterceptors(FileFieldsInterceptor(
        [
        {name: 'images1', maxCount: 1 },
        {name: 'images2', maxCount: 1 }
        ],
        multerOptions)
    )
    async createGame(
        
    @UploadedFiles() files: { images1?: Express.Multer.File; images2?: Express.Multer.File },
    @Body('createGameDto') createGame: string,) 
    {
        const createGameDto: CreateGameDto = JSON.parse(createGame)
        return this.balanceService.createGame(
            createGameDto,
            files.images1?.[0] ?? null,
            files.images2?.[0] ?? null,
        );
    }

    @Get()
    async getAllGames() {
        return await this.balanceService.findAll();
    }

    @Get('random')
    async getGame() {
        const balancegame = await this.balanceService.getGame();
        if (!balancegame) throw new NotFoundException('남은 게임이 없습니다.');
        return balancegame;
    }

    @Delete(':id')
    async deleteGameById(@Param('id') id: number) {
        return await this.balanceService.deleteGameById(id);
    }

    @Delete()
    async deleteAll() {
        return await this.balanceService.deleteAll();
    }
}
