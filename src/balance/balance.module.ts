import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './entity/balance.entity';
import { BalanceController } from './balance.controller';
import { Choice } from './entity/choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Balance, Choice])],
  controllers: [BalanceController],
  providers: [BalanceService]
})
export class BalanceModule {}
