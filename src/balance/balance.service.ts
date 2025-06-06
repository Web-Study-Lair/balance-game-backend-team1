import { Injectable } from '@nestjs/common';
import { Balance } from './entity/balance.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDto } from './DTO/CreateGameDto';

@Injectable()
export class BalanceService {
    constructor(
        @InjectRepository(Balance)
        private balanceRepository: Repository<Balance>,
    ){}

    async findAll(): Promise<Balance[]> {
        return await this.balanceRepository.find();
    }

    async createGame(createGameDto: CreateGameDto): Promise<Balance> {
        const { title, choices } = createGameDto;

        const game = this.balanceRepository.create({
            title,
            choices,
    });

    return await this.balanceRepository.save(game);
    }
}
