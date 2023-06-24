import { Entity, Column, PrimaryGeneratedColumn, } from "typeorm";

@Entity({name: 'user_data'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({})
    password: string;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string;

    @Column({ nullable: true, type: 'timestamp' })
    updatedAt: string;
}