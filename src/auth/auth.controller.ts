import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  register(@Body() authenticateDto: AuthenticateDto) {
    return this.authService.register(authenticateDto);
  }

  @Post('/login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/users')
  getUsers() {
    return this.authService.getUsers();
  }
}
