import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [],
})
export class AppModule {}
