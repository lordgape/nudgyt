import { Field, ID, ObjectType } from '@nestjs/graphql';

/* istanbul ignore file */
@ObjectType('User')
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  createdAt: string;
}
