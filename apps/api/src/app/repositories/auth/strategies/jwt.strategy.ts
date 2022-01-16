import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { AuthValidationPayloadInterface } from '../interfaces/auth-validation-payload.interface';
import { configuration } from '../../../configs/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(configuration.YMRLK_JWT_SECRET)
    });
  }

  async validate(payload: AuthValidationPayloadInterface): Promise<AuthValidationPayloadInterface> {
    return {sub: payload.sub, userName: payload.userName};
  }
}
