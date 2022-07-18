import { IsEmail, IsNotEmpty } from 'class-validator';

/* istanbul ignore file */
export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}
