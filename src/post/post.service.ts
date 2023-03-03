import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User, tags: Tag[]) {
    const newPost = this.postRepository.create({
      title: createPostDto.title,
      body: createPostDto.body,
      user,
      tags,
    });

    return this.postRepository.save(newPost);
  }

  findAll() {
    return this.postRepository.find({ relations: ['user', 'tags'] });
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async update(id: number, postParams) {
    return this.postRepository.update(id, postParams);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
