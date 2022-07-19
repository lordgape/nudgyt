import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

/* istanbul ignore file */
@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
