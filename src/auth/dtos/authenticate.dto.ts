import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserAlreadyExists } from 'src/auth/decorators/user-exist.decorator';

export class AuthenticateDto {
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;

  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `Password Rule. Mininum of 1 upper case letter, 1 lower case letter, 1 number or special character`,
  })
  password: string;

  @IsNotEmpty()
  @UserAlreadyExists()
  email: string;
}
