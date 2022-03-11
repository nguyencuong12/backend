import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
// private productModel: Model<ProductDocument>,
@Schema()
export class User {
  @Prop({ unique: true })
  username: string;
  @Prop()
  password: string;
  @Prop()
  role: [];
}

// UserSchema.add(
//     username:"123",
//     password:"123"
// )

export const UserSchema = SchemaFactory.createForClass(User);
