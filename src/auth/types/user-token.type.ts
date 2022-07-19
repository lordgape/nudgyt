import { Field, ObjectType } from '@nestjs/graphql';

/* istanbul ignore file */
@ObjectType()
export class UserToken {
  @Field()
  accessToken: string;
}
