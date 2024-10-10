import { CommentEntity } from "src/posts/entities/comment-entity";
import { Post } from "src/posts/entities/post-entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type:'text', default: '' })
    photo: string;
    
    @Column('text')
    name: string;

    @Column({ unique: true, })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true, name: 'is_active'})
    isActive: boolean;

    @Column({ 
        type: 'enum',
        enum: ['user', 'admin'],
        default: ['user'],
        array: true,
     })
    roles: string[];

    @OneToMany(() => Post, post => post.user)
    posts: Post[]

    @OneToMany(() => CommentEntity, comment => comment.user)
    comments: CommentEntity[]
}
