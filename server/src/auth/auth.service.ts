import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserModel, UserState } from 'src/database/models/user.model';

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
}
