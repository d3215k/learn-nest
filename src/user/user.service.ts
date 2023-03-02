import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const entity = Object.assign(new User(), createUserDto);
    return this.usersRepository.save(entity);
  }

  async createProfile(id: number, createProfileDto: CreateProfileDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const newProfile = this.profileRepository.create(createProfileDto);
    const savdProfile = await this.profileRepository.save(newProfile);
    user.profile = savdProfile;
    return this.usersRepository.save(user);
  }

  get(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    // return this.usersRepository.findOne({
    //   where: { id },
    //   relations: ['profile'],
    // });

    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('user.id = :id', { id })
      .getOne();
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
