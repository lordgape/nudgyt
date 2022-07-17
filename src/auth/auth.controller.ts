import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dtos/authenticate.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  register(@Body() authenticateDto: AuthenticateDto) {
    return this.authService.register(authenticateDto);
  }

  @Post('/login')
  login() {
    return this.authService.login();
  }

  @Get('/users')
  getUsers() {
    return this.authService.getUsers();
  }
}
