import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './post.service';
import { AuthGuard } from 'src/user/guards/auth/auth.guard';

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

    @UseGuards(AuthGuard)
    @Post()
    createPost(@Body() request: Request){
        return this.postsService.createPost(request)
    }

    @Put()
    updatePost(@Param('id') id:string, @Body() request){

    }
}
