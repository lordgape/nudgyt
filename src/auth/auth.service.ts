import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { LoginDto } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

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

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user: User = await this.usersRepository.findOneUser({
      email: username,
    });

    if (!user) {
      throw new UnauthorizedException(`Please provide a valid credentials `);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(`Please provide a valid credentials `);
    }

    const payload = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };

    console.log(payload);
  }
}
