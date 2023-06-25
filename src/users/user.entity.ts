import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, } from "typeorm";
import { Profile } from "./profile.entity";
import { Post } from "src/posts/post.entity";

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

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Post, post => post.author)
    posts: Post[];
    
}