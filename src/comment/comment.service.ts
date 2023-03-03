import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto, user: any, postId: number) {
    return this.commentRepository.save({
      ...createCommentDto,
      user,
      post: { id: postId },
    });
  }

  createReply(
    parentId: number,
    postId: number,
    createCommentDto: CreateCommentDto,
    user: any,
  ) {
    return this.commentRepository.save({
      parent: { id: parentId },
      post: { id: postId },
      ...createCommentDto,
      user,
    });
  }

  findAll() {
    return this.commentRepository.find({
      relations: ['user', 'post'],
      select: {
        id: true,
        body: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
          name: true,
        },
        post: {
          id: true,
          title: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'post'],
      select: {
        id: true,
        body: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
          name: true,
        },
        post: {
          id: true,
          title: true,
        },
      },
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(id, updateCommentDto);
  }

  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
