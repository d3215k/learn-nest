import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { User } from './user/entities/user.entity';
import { Profile } from './profile/entities/profile.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/entities/tag.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { LikeModule } from './like/like.module';
import { Like } from './like/entities/like.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MessageProducerService } from './message.producer.service';
import { MessageConsumer } from './message.consumer';
import { FileProducerService } from './file.producer.service';
import { FileConsumer } from './file.consumer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue(
      { name: 'message-queue' },
      { name: 'file-operation-queue' },
    ),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Profile, Post, Tag, Comment, Like],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    PostModule,
    TagModule,
    CommentModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [
    MessageProducerService,
    MessageConsumer,
    FileProducerService,
    FileConsumer,
  ],
})
export class AppModule {}
