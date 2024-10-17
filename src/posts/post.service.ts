import { BadRequestException, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Post } from './entities/post-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { CommentEntity } from './entities/comment-entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>
  ) { }

  posts = [];

  findAll(userId: string) {
    return this.postRepository.find({
      where: { user: { id: userId } },
      relations:['comments']
    });
  }

  findById(id: string) {
    return this.posts.find(post => post.id === id);
  }

  async findByUserId(id: string) {
    return await this.postRepository.find({
      where: {
        user: { id }
      },
      relations: ['user', 'comments']
    });
  }

  async createComment(request: CreateCommentDto) {
    try {
      const newComment = this.commentRepository.create({
        comment: request.comment,
        post: { id: request.postId },
        user: { id: request.userId }
      });

      return await this.commentRepository.save(newComment);

    } catch (error) {
      console.log(error)
      throw new BadRequestException();
    }
  }


  async createPost(createPost: CreatePostDto) {
    try {
      const user = await this.userRepository.findOneBy({ id: createPost.userId });
      const post = this.postRepository.create({
        url: createPost.url,
        user
      });
      return await this.postRepository.save(post);
    } catch (error) {
      console.log(error)
      throw new BadRequestException();
    }
  }

  updatePost(id: string, updatePost: UpdatePostDto) {
    this.posts = this.posts.map(post =>
      post.id === id
        ? { ...post, ...updatePost }
        : post
    );
  }

  async deletePost(postId: string, userId: string) {
    await this.postRepository.delete({id:postId});
    return await this.findByUserId(userId);
  }

}