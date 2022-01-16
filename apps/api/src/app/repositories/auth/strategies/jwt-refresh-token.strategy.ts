import { Injectable, Request, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users/services/users.service';
import { configuration } from '../../../configs/configuration';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

  constructor(private configService: ConfigService, private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
      ignoreExpiration: true,
      secretOrKey: configService.get(configuration.YMRLK_JWT_SECRET),
      passReqToCallback: true
    });
  }

  async validate(request: Request, payload: any): Promise<any> {

    const user = await this.usersService.findByUUID(payload.sub);

    if (!user) {
      throw new UnauthorizedException('No refresh token found');
    }

    if ((request.body as any).refreshToken != (await user).refreshToken) {
      throw new UnauthorizedException('Refresh token does not matched');
    }

    if (new Date() > new Date((await user).refreshTokenExpiresIn)) {
      throw new UnauthorizedException('Refresh token expired');
    }

    return { sub: payload.sub, userName: user.userName };
  }


}
