import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
export type UserDocument = User & Document;
// private productModel: Model<ProductDocument>,
@Schema()
export class User extends Document {
  @Prop({ unique: true })
  username: string;
  @Prop()
  password: string;
  @Prop([String])
  role: string[];

  validatePassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  console.log('validate calll');
  return bcrypt.compareSync(password, this.password);
};

// UserSchema.method({
//   validatePassword: async function (password: string) {
//     return bcrypt.compareSync(password, this.password);
//   },
// });
