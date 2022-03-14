import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async login(userField: any) {
    let user = await this.userModel.findOne({ username: userField.username });
    console.log('USER', user);
    // user.validatePassword()
    user.validatePassword(user.password);
  }
}
