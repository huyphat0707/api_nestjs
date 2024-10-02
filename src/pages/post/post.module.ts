import { User } from 'src/pages/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post]), JwtModule.register({})],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
