import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "./comment-entity";

@Entity('posts')
export class Post{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({ type:'varchar' })
    url: string;

    @ManyToOne(() => User, user => user.posts)
    user: User

    @OneToMany(() => CommentEntity, comment => comment.post, { cascade: true })
    comments: CommentEntity[]

}