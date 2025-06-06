import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGameDto } from './DTO/CreateGameDto';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
    constructor(private readonly balanceService: BalanceService) {}

    @Post()
    async createGame(@Body() createGameDto: CreateGameDto) {
        return await this.balanceService.createGame(createGameDto);
    }

    @Get()
    async getAllGames() {
        return await this.balanceService.findAll();
    }
}
