import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BalanceGame } from './balanceGame.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  @Exclude()
  index: number;

  @Column({ nullable: true })
  id?: number;

  @Column({ type: 'text', nullable: true })
  imageUrl: string | null;

  @Column()
  description: string;

  @Column({ default: 0 })
  count: number;

  @ManyToOne(() => BalanceGame, (balanceGame) => balanceGame.choices, {
    onDelete: 'CASCADE',
  })
  balanceGame: BalanceGame;
}
