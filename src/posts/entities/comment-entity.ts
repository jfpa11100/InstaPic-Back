import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post-entity";
import { User } from "src/user/entities/user.entity";

@Entity('comments')
export class CommentEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar'
    })
    comment: string;

    @ManyToOne(() => Post, post => post.comments,
        {
            onDelete: "CASCADE",
            // cascade:true
        }
    )
    post: Post

    @ManyToOne(() => User, user => user.comments)
    user:User
}