import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

import { UserInterface } from '@ymrlk-code-blog/data';

import { SkipJwtCheck } from '../../../../decorators/skip-jwt-check.decorator';
import { UsersService } from '../../services/users.service';
import { UserDocument } from '../../schemas/user.schema';

@Controller()
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Get('email/:email')
  async getByEmail(@Param() email: { email: string }): Promise<UserDocument> {
    const userDocument = await this.usersService.findByEmail(email.email);

    if (!userDocument) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `User with ${ email.email } email was not found`
      }, HttpStatus.NOT_FOUND);
    }

    return userDocument;
  }

  @Get('uuid/:uuid')
  async getByUUID(@Param() uuid: { uuid: string }): Promise<UserDocument> {
    const userDocument = await this.usersService.findByUUID(uuid.uuid);

    if (!userDocument) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `User with ${ uuid.uuid } was not found`
      }, HttpStatus.NOT_FOUND);
    }

    return userDocument;
  }

  @SkipJwtCheck()
  @Post('register')
  async createOne(@Body() model: UserInterface): Promise<UserDocument> {
    const userDocument = await this.usersService.createOne(model);

    if (userDocument) {
      return userDocument;
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'User already exist'
      }, HttpStatus.BAD_REQUEST)
    }
  }

}
