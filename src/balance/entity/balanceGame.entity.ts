import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Choice } from "./choice.entity";

@Entity()
export class BalanceGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({default: true})
    isActive: boolean;

    @OneToMany(() => Choice, (choice) => choice.balanceGame, { cascade: true, eager: true })
    choices: Choice[];

}
