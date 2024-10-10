import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/user/guards/auth/auth.guard';

@Controller('posts')
export class PostsController {

  constructor(private readonly postsService:PostsService){}

  @Get()
  findAll(){
    return this.postsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id:string){
    return this.postsService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createPost(@Req() request){
    const createPostDto:CreatePostDto = request.body;
    return this.postsService.createPost(createPostDto);
  }

  @UseGuards(AuthGuard)
  @Get('user/id')
  findByUserId(@Req() req:Request){
    const request:any = req.body;
    return this.postsService.findById(request.id);
  }



  @Put(':id')
  updatePost(@Param('id') id:string, @Body() request:UpdatePostDto){
    this.postsService.updatePost(id, request);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deletePost(@Req() req:any){
    const userId = req.body['id'];
    const postId = req.params['id']
    return this.postsService.deletePost(postId, userId);
  }

}