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
      email: 'moryliak.y@gmail.com',
      password: '12345',
    },
    {
      userId: 2,
      email: 'maria',
      password: 'guess',
    },
  ];

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async findOne(email: string): Promise<any | undefined> {
    return this.users.find(user => user.email === email);
  }

}
