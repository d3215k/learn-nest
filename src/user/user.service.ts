import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  Interval,
  Timeout,
  Cron,
  CronExpression,
  SchedulerRegistry,
} from '@nestjs/schedule';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private readonly eventEmitter: EventEmitter2,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  private readonly logger = new Logger(UserService.name);

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'delete_expired_user' })
  handleCron() {
    this.logger.debug('Deleting expired users...');
  }

  @Interval('notifications', 10000)
  handleInterval() {
    this.logger.debug('Called every 10 second');
  }

  @Timeout('notifications', 2500)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }

  create(createUserDto: CreateUserDto) {
    this.logger.log('creating user...', createUserDto);
    this.eventEmitter.emit('user.created', createUserDto);

    const establishWeTimeout = setTimeout(
      () => this.establishWsConnection(createUserDto),
      5000,
    );

    this.schedulerRegistry.addTimeout('ws', establishWeTimeout);

    const entity = Object.assign(new User(), createUserDto);
    return this.userRepository.save(entity);
  }

  private establishWsConnection(createUserDto: CreateUserDto) {
    this.logger.log('establishing ws connection...', createUserDto.email);
  }

  @OnEvent('user.created')
  welcomeNewUser(payload: CreateUserDto) {
    this.logger.log('welcome new user...', payload.email);
  }

  @OnEvent('user.created', { async: true })
  async sendWelcomeGift(payload: CreateUserDto) {
    this.logger.log('sending welcome gift...', payload.email);
    await new Promise<void>((resolve) => setTimeout(resolve, 5000));
    this.logger.log('welcome gift sent...', payload.email);
  }

  async createProfile(id: number, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const newProfile = this.profileRepository.create(createProfileDto);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  get(): Promise<User[]> {
    return this.userRepository.find();
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['profile'] });
  }

  findOne(id: number) {
    // return this.userRepository.findOne({
    //   where: { id },
    //   relations: ['profile'],
    // });

    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('user.id = :id', { id })
      .getOne();
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
