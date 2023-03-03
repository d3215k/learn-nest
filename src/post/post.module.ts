import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { TagService } from 'src/tag/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag, User])],
  controllers: [PostController],
  providers: [PostService, TagService],
})
export class PostModule {}
