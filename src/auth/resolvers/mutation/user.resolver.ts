import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/auth/dtos/createUser.dto';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { UserToken } from 'src/auth/types/user-token.type';
import { UserType } from 'src/auth/types/user.type';

/* istanbul ignore file */
@Resolver(() => UserType)
export class UserMutationResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserType)
  async register(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<UserType> {
    return this.authService.register(createUserInput);
  }

  @Mutation(() => UserToken)
  async login(@Args('loginInput') loginInput: LoginDto): Promise<UserToken> {
    return this.authService.login(loginInput);
  }
}
