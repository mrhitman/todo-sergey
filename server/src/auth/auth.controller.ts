import { Body, Response, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

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

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async login(@CurrentUser() user) {
    return this.authService.login(user);
  }

  @Post('/refresh')
  public async refresh() {
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  public async logout(@CurrentUser() user) {
    return this.authService.logout(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/secured')
  public async secured(@CurrentUser() user) {
    return user;
  }
}
