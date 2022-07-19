import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserToken {
  @Field()
  accessToken: string;
}