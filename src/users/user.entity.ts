import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Profile } from "./profile.entity";
import { Post } from "src/posts/post.entity";

@Entity({ name: 'user_data' })
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

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Post, post => post.author)
    posts: Post[];

}