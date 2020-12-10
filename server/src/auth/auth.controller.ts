import { Body, Controller, Get, Post, Res, UseGuards, Logger } from '@nestjs/common';
import { Response } from 'express';
import { UserRole } from '../database/models/user.model';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './roles.decorator';

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
  public async login(@CurrentUser() user, @Res() response: Response) {
    const tokens = await this.authService.login(user);
    response.cookie('token', tokens.token, { httpOnly: true });
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    response.json(tokens);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  public async logout(@CurrentUser() user) {
    return this.authService.logout(user);
  }

  @Post('/refresh')
  public async refresh(@CurrentUser() user, @Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(user, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  public async me(@CurrentUser() user) {
    return user;
  }

  @Get('/admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  public async test(@CurrentUser() user) {
    return user;
  }
}
