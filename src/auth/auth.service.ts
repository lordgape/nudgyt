import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { LoginDto } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async register(authenticateDto: AuthenticateDto): Promise<User> {
    return this.usersRepository.createUser(authenticateDto);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;

    const user: User = await this.usersRepository.findOneUser({
      email: username,
    });

    if (!user) {
      throw new UnauthorizedException(`Please provide a valid credentials `);
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(`Please provide a valid credentials `);
    }

    const payload: JwtPayload = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };

    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.findAllUsers();
  }
}
