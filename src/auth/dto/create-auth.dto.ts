import { IsString, IsEmail } from 'class-validator';
export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsEmail()
  email: string;

}
export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
