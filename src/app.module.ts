import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './balance/balance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './balance/entity/balance.entity';
import { Choice } from './balance/entity/choice.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3308,
        username: 'root',
        password: '1234',
        database: 'balance_db',
        entities: [Balance, Choice],
        synchronize: true,
      }),
      BalanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
