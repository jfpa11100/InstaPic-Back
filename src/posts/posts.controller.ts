import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/user/guards/auth/auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
export class PostsController {

  constructor(private readonly postsService:PostsService){}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Body() body){
    const userId = body['userId'];
    return this.postsService.findAll(userId);
  }

  @Get(':id')
  findById(@Param('id') id:string){
    return this.postsService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createPost(@Req() req){
    const request:CreatePostDto = req.body;
    return this.postsService.createPost(request);
  }

  @UseGuards(AuthGuard)
  @Get('user/id')
  findByUserId(@Req() req:Request){
    const request:any = req.body;
    return this.postsService.findByUserId(request.id);
  }

  @UseGuards(AuthGuard)
  @Post('comment')
  createComment(@Req() req){
    const request:CreateCommentDto = req.body;
    return this.postsService.createComment(request);
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