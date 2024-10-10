import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { In, Repository } from "typeorm"
import { Post } from "./entities/post-entity"
import { InjectRepository } from "@nestjs/typeorm"
import { url } from "inspector"
import { User } from "src/user/entities/user.entity"


@Injectable()
export class PostsService{
    
    posts = []

    constructor
        (@InjectRepository(Post) private readonly postRepository: Repository<Post>,
            @InjectRepository(User) private readonly userRepository: Repository<Post>
        ){  

    }

    
    findAll() {
        return this.posts
    }

    findById({ id }){
        return this.posts.find(post => post.id === id)
    }

    async createPost(createPostDto){
        try {
            const user = await this.userRepository.findOneBy({ id: createPostDto.userId })
    
            const post = this.postRepository.create({
                 url: createPostDto.url, user 
            })
            
            return await this.postRepository.save(post)

        } catch (error) {
            throw new InternalServerErrorException('Error al guardar la publicación')
        }
    }

    updatePost(id:string, request){
        this.posts = this.posts.map(post => 
            post.id === id
            ? {...post, ...request }
            :post
        )
    }

    deletePost(id: string, userId:string){
        // this.post
    }


}