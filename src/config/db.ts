import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { User } from 'src/user/entities/user.entity';

export default class Config {
  static getOrmConfig(): TypeOrmModuleOptions {
    return {
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Profile],
      synchronize: true,
    };
  }
}
