import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Choice } from "./choice.entity";

@Entity()
export class Balance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({default: false})
    isActive: boolean;

    @OneToMany(() => Choice, (choice) => choice.balance, { cascade: true, eager: true })
    choices: Choice[];

}
