import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { GraphqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { UserType } from 'src/auth/types/user.type';

/* istanbul ignore file */
@Resolver(() => UserType)
@UseGuards(GraphqlAuthGuard)
export class UserQueryResolver {
  constructor(private authService: AuthService) {}

  @Query(() => [UserType])
  async users(): Promise<UserType[]> {
    return this.authService.getUsers();
  }
}
