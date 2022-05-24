import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findOne(username: string) {
    const user = await this.userModel.findOne({ username: username }).exec();
    if (user && user.role[0] === 'admin') {
      return user;
    }
  }
}
