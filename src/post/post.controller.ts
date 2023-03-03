import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TagService } from 'src/tag/tag.service';
import { CommentService } from 'src/comment/comment.service';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly tagService: TagService,
    private readonly commentService: CommentService,
  ) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Request() req: any) {
    const tags = await this.tagService.getByIds(createPostDto.tags);
    return this.postService.create(createPostDto, req.user, tags);
  }

  @Post(':id/comment')
  async createComment(
    @Param('id') id: number,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: any,
  ) {
    return this.commentService.create(createCommentDto, req.user, id);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':userId/user')
  findByUser(@Param('userId') userId: number) {
    return this.postService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    const postParams = { title: updatePostDto.title, body: updatePostDto.body };
    return this.postService.update(+id, postParams);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postService.remove(+id);
  }
}
