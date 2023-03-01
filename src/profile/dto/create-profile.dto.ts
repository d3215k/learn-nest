import { IsDateString, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  phone: string;

  @IsDateString()
  dob: string;

  @IsString()
  address: string;

  city: string;

  state: string;

  country: string;

  zip: string;
}
