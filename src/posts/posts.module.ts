import { Module } from "@nestjs/common";
import { Post } from "./entities/post-entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment-entity";

@Module({
    controllers:[],
    providers:[],
    imports:[
        TypeOrmModule.forFeature([Post, CommentEntity]),
    ],
})
export class PostsModule{

}