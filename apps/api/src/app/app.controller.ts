import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

import { LocalAuthGuard } from './repositories/auth/guards/local-auth.guard';
import { AuthService } from './repositories/auth/services/auth.service';
import { JwtAuthGuard } from './repositories/auth/guards/jwt-auth.guard';

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
