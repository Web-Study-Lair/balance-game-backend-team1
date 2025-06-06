import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Balance } from "./balance.entity";

@Entity()
export class Choice {
    @PrimaryGeneratedColumn()
    index: number;

    @Column({ nullable: true })
    imageUrl: string;

    @Column()
    description: string;

    @ManyToOne(() => Balance, (balance) => balance.choices, { onDelete: 'CASCADE' })
    balance: Balance;
}