import { Controller, Post, UseGuards, Request } from '@nestjs/common';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { SkipJwtCheck } from '../../../decorators/skip-jwt-check.decorator';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @SkipJwtCheck()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
