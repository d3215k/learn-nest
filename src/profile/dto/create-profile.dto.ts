import { IsDateString, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  phone: string;

  @IsDateString()
  dob: string;

  @IsString()
  address: string;
}
