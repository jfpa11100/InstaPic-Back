import { Injectable } from "@nestjs/common"


@Injectable()
export class PostsService{

    posts = []
    
    findAll() {
        return this.posts
    }

    findById(id){
        return this.posts.find(post => post.id === id)
    }

    createPost(request){
        this.posts = [...this.posts, request]
    }

    updatePost(id:string, request){
        this.posts = this.posts.map(post => 
            post.id === id
            ? {...post, ...request }
            :post
        )
    }

    deletePost(id: string){
        // this.post
    }


}