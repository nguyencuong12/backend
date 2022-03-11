import { Injectable } from '@nestjs/common';
import { UserException } from 'src/exceptions/user.exception';
import { HttpStatus } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  static async checkAuth() {
    // return false;
    // throw new Error('');
  }
  async generateToken(id: string) {}
}
