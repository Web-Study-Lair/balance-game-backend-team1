<<<<<<< HEAD
import { Body, Controller, Delete, Get, NotFoundException, Param, PayloadTooLargeException, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
=======
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
>>>>>>> origin/main
import { CreateGameDto } from './DTO/CreateGameDto';
import { CreateChoiceDto } from './DTO/CreateChoiceDto';
import { BalanceService } from './balance.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/config/multer.config';

@Controller('balanceGame')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

<<<<<<< HEAD
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
=======
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 2 }], multerOptions),
  )
  async createGame(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() body: any, // TODO: DTO 정의할 것!!!
  ) {
    const images = files.images || [];
    const createGameDto: CreateGameDto = JSON.parse(body.game) as CreateGameDto;
    return await this.balanceService.createGame(createGameDto, images);
  }
>>>>>>> origin/main

  @Get()
  async getAllGames() {
    return await this.balanceService.findAll();
  }

<<<<<<< HEAD
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
=======
  @Delete(':id')
  async deleteGameById(@Param('id') id: number) {
    return await this.balanceService.deleteGameById(id);
  }
>>>>>>> origin/main

  @Delete()
  async deleteAll() {
    return await this.balanceService.deleteAll();
  }
}
