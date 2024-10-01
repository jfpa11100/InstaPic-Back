import { Module } from '@nestjs/common';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/post.service';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.AP_DB_HOST,
      database: process.env.AP_DB_NAME,
      port: +process.env.AP_DB_PORT,
      username: process.env.AP_DB_USER,
      password: process.env.AP_DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    PostsModule,
    UserModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class AppModule {}
