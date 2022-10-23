import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsNotEmpty()
  search: string;

  @IsString()
  @IsNotEmpty()
  type: 'name' | 'email';
}
