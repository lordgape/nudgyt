import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserAlreadyExists } from '../decorators/user-exist.decorator';

/* istanbul ignore file */
@InputType()
export class CreateUserDto {
  @IsNotEmpty()
  @Field()
  firstname: string;

  @IsNotEmpty()
  @Field()
  lastname: string;

  @Field()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `Password Rule. Mininum of 1 upper case letter, 1 lower case letter, 1 number or special character`,
  })
  password: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @UserAlreadyExists()
  email: string;
}
