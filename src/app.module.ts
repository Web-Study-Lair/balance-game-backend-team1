import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './balance/balance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceGame } from './balance/entity/balanceGame.entity';
import { Choice } from './balance/entity/choice.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { AppDataSource } from 'dataSource';

@Module({
  imports: [
      ScheduleModule.forRoot(),
      TypeOrmModule.forRoot(AppDataSource.options),
      BalanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
