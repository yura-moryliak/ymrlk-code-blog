import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';
import { generate } from 'rand-token'

import { UsersService } from '../../users/services/users.service';
import { configuration } from '../../../configs/configuration';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      return null;
    }

    const arePasswordsSame = await compare(password, user.password);

    if (user && arePasswordsSame) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: any): Promise<any> {
    const payload = { userName: user.userName, sub: user.uuid };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: await this.generateRefreshToken(user.uuid)
    };
  }

  private async generateRefreshToken(userUUID: string): Promise<any> {
    const refreshToken = generate(this.configService.get(configuration.YMRLK_REFRESH_TOKEN_SIZE));
    const expirationDate = new Date();

    expirationDate.setDate(expirationDate.getDate() + +this.configService.get(configuration.YMRLK_REFRESH_TOKEN_EXPIRATION_DAYS));

    await this.usersService.saveOrUpdateRefreshToken(userUUID, refreshToken, expirationDate);

    return refreshToken;
  }

}
