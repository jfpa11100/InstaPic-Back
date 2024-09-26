import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';

@Controller('posts')
export class PostsController {

    posts = []

    constructor() {}
    
    @Get()
    findPost(@Query('id') id){
        return this.posts.find(post => post.id === id)
    }

    @Get('all')
    getAllPosts() {
        return this.posts
    }


    @Post()
    createPost(@Body() request: Request){
        console.log(request)
        this.posts.push(request)
        return ``
    }
}
