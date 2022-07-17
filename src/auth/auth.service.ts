import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  getUsers() {
    return 'Getting users....';
  }

  async register(authenticateDto: AuthenticateDto): Promise<User> {
    return this.usersRepository.createUser(authenticateDto);
  }

  async login() {
    return 'Logging in';
  }
}
