import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  // @IsBoolean()
  isActive: boolean;

  @IsString()
  password: string;
}
