import { HttpException } from '@nestjs/common';

export class UserException extends HttpException {
  constructor(status: any, message: string) {
    super(message, status);
  }
}
