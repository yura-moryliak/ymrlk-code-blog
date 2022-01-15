import { Controller, Post, UseGuards, Request } from '@nestjs/common';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { SkipAuthCheck } from '../../../decorators/is-public.decorator';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @SkipAuthCheck()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
