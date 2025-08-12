import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceGame } from './entity/balanceGame.entity';
import { BalanceController } from './balance.controller';
import { Choice } from './entity/choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BalanceGame, Choice])],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
