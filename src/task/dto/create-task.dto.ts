import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}
