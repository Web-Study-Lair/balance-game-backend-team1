import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './balance/balance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceGame } from './balance/entity/balanceGame.entity';
import { Choice } from './balance/entity/choice.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [BalanceGame, Choice],
      synchronize: true,
    }),
    BalanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
