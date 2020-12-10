import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { omit } from 'lodash';
import { UserModel, UserState } from 'src/database/models/user.model';
import { RefreshTokenModel } from '../database/models/refresh-token.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(protected readonly jwtService: JwtService) {}

  public async register(data: Partial<UserModel>) {
    const existUser = await UserModel.query().findOne({ email: data.email });

    if (existUser) {
      throw new BadRequestException('User with such email is busy');
    }

    const user = await UserModel.query().insert({
      ...data,
      state: UserState.pending,
      password: await bcrypt.hash(data.password, 10),
    });

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
      }),
    };
  }

  public async getUser(id: number) {
    const user = await UserModel.query().findById(id);

    if (!user) {
      throw new BadRequestException('Invalid user');
    }

    return omit(user, ['password']);
  }

  public async validateUser(email: string, password: string) {
    const user = await UserModel.query().findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return omit(user, ['password']);
    }
  }

  public async login(user: UserModel) {
    const refreshToken = await RefreshTokenModel.query().insert({
      token: uuid(),
      userId: user.id,
    });

    return {
      token: this.jwtService.sign({
        id: user.id,
      }),
      refreshToken: refreshToken.token,
    };
  }

  public async logout(user: UserModel) {
    await RefreshTokenModel.query().delete().where({ userId: user.id });
  }

  public async refresh(user: UserModel, refreshToken: string) {
    const token = await RefreshTokenModel.query().findOne({ token: refreshToken, userId: user.id });

    if (token) {
      throw new BadRequestException('Invalid refresh token');
    }

    await token.$query().delete();
    const newToken = await RefreshTokenModel.query().insert({
      token: uuid(),
      userId: user.id,
    });

    return {
      token: this.jwtService.sign({
        id: user.id,
      }),
      refreshToken: newToken.token,
    };
  }
}
