import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto, user: User) {
    const newProfile = this.profileRepository.create(createProfileDto);
    newProfile.user = user;
    return this.profileRepository.save(createProfileDto);
  }

  async findAll() {
    const [profiles, profilesCount] = await this.profileRepository.findAndCount(
      { relations: ['user'] },
    );

    return { profiles, profilesCount };
  }

  findOne(id: number) {
    return this.profileRepository.findOneBy({ id });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update(id, updateProfileDto);
  }

  remove(id: number) {
    return this.profileRepository.delete(id);
  }
}
