import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { CommentEntity } from "./comment-entity";

@Entity('posts')
export class Post{
    @PrimaryColumn('uuid')
    id:string;

    @Column({ type:'varchar' })
    url: string;

    @ManyToOne(() => User, user => user.posts)
    user: User

    @OneToMany(() => CommentEntity, comment => comment.post)
    comments: CommentEntity[]

}