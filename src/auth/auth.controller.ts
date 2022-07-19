import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { User } from './entities/user.entity';

/* istanbul ignore file */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  register(@Body() authenticateDto: CreateUserDto) {
    return this.authService.register(authenticateDto);
  }

  @Post('/login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/users')
  @UseGuards(AuthGuard())
  getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }
}
