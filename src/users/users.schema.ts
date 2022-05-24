import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({ unique: true })
  username: string;
  @Prop()
  password: string;
  @Prop()
  role?: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
// ProductSchema.index({ index: 'text' }, { unique: true });
