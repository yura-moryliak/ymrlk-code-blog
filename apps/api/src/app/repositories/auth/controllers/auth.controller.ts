import { Controller, Post, UseGuards, Request } from '@nestjs/common';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

import { JwtRefreshAuthGuard } from '../guards/jwt-refresh-auth.guard';
import { SkipJwtCheck } from '../../../decorators/skip-jwt-check.decorator';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @SkipJwtCheck()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user._doc);
  }

  @SkipJwtCheck()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req: any) {
    return await this.authService.login(req.user);
  }

}
