import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

import { SkipJwtCheck } from '../../../../decorators/skip-jwt-check.decorator';
import { UsersService } from '../../services/users.service';

@Controller()
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Get('email/:email')
  async getByEmail(@Param() email: { email: string }): Promise<any> {
    const foundUser = await this.usersService.findByEmail(email.email);

    if (!foundUser) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'User not found'
      }, HttpStatus.BAD_REQUEST);
    }

    return foundUser;
  }

  @Get('uuid/:uuid')
  async getByUUID(@Param() uuid: { uuid: string }): Promise<any> {
    const foundUser = await this.usersService.findByUUID(uuid.uuid);

    if (!foundUser) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'User not found'
      }, HttpStatus.BAD_REQUEST);
    }

    return foundUser;
  }

  @SkipJwtCheck()
  @Post('register')
  async createOne(@Body() model: any): Promise<any> {
    const createdUserDocument = await this.usersService.createOne(model);

    if (createdUserDocument) {
      return createdUserDocument;
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'User already exist'
      }, HttpStatus.BAD_REQUEST)
    }
  }

}
