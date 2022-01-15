import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserInterface } from '../interfaces/user.interface';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {

  private readonly users: UserInterface[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find(user => user.username === username);
  }

}
