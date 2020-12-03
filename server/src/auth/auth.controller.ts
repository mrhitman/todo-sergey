import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Post('/register')
  public async register(
    @Body('email') email: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.register({
      email,
      firstName,
      lastName,
      password,
    });

    return user;
  }

  @Post('/login')
  public async login() {
    return;
  }

  @Post('/refresh')
  public async refresh() {
    return;
  }

  @Post('/logout')
  public async logout() {
    return;
  }
}
