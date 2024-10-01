import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { PostsService } from './post.service';

@Controller('posts')
export class PostsController {


    constructor(private readonly postsService: PostsService) {}
    
    @Get()
    findAll() {
        return this.postsService.findAll()
    }

    @Get(':id')
    findPost(@Query('id') id){
        this.postsService.findById(id)
    }

    @Post()
    createPost(@Body() request: Request){
        this.postsService.createPost(request)
    }

    @Put()
    updatePost(@Param('id') id:string, @Body() request){

    }
}
