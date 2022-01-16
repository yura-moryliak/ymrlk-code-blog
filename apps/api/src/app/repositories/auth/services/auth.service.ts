import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';

import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

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

  login(user: any): any {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

}
