import { IsBoolean, IsEmail, IsString, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  isActive: boolean;
}
