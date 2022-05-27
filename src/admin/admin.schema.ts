import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { GuestDocument } from 'src/guest/guest.schema';
import { GuestDto } from 'src/guest/dto/orderInterface';
// import { GuestDto } from './dto/orderInterface';
export type AdminDocument = Admin & Document;

@Schema({ versionKey: false })
export class Admin {
  @Prop({})
  guestOrder: GuestDto;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
// ProductSchema.index({ index: 'text' }, { unique: true });
