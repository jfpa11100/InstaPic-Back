import { Module } from "@nestjs/common";
import { Post } from "./entities/post-entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment-entity";
import { User } from "src/user/entities/user.entity";
import { PostsController } from "./posts.controller";
import { PostsService } from "./post.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            User,
            Post,
            CommentEntity
          ]),
    ],
    controllers:[PostsController],
    providers:[PostsService]

})
export class PostsModule{}