import { Body, Controller, Delete, Get, Param, PayloadTooLargeException, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateGameDto } from './DTO/CreateGameDto';
import { BalanceService } from './balance.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/config/multer.config';

@Controller('balanceGame')
export class BalanceController {
    constructor(private readonly balanceService: BalanceService) {}

    @Post('upload')
    @UseInterceptors(FileFieldsInterceptor(
        [{name: 'images', maxCount: 2,}],
        multerOptions)
    )
    async createGame(@UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() body: any,) 
    {
        const images = files.images || [];
        const createGameDto: CreateGameDto = JSON.parse(body.game);
        return await this.balanceService.createGame(createGameDto, images);
    }

    @Get()
    async getAllGames() {
        return await this.balanceService.findAll();
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
