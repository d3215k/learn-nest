import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    return this.profilesRepository.save(createProfileDto);
  }

  async findAll() {
    const [profiles, profilesCount] =
      await this.profilesRepository.findAndCount();

    return { profiles, profilesCount };
  }

  findOne(id: number) {
    return this.profilesRepository.findOneBy({ id });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.profilesRepository.update(id, updateProfileDto);
  }

  remove(id: number) {
    return this.profilesRepository.delete(id);
  }
}
