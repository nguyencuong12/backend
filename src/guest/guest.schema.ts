import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GuestDto } from './dto/orderInterface';
export type GuestDocument = Guest & Document;
// interface userInfoInterface {
//   FullName: string;
//   PhoneNumber: string;
//   Note: string;
//   Email: string;
//   Address: string;
// }

// interface orderInterface {
//   title: string;
//   price: string;
//   amount: number;
//   description: string;
//   id: string;
//   // image: "/cuong1.png";
// }

@Schema() // will create _id filed
class userInfo {
  FullName: string;
  PhoneNumber: string;
  Note: string;
  Email: string;
  Address: string;
}
@Schema() // will create _id filed
class orderInfo {
  title: string;
  price: string;
  amount: number;
  description: string;
  id: string;
}

@Schema({ versionKey: false })
export class Guest {
  @Prop({})
  userInfo: userInfo;
  // @Prop({})
  // orderInfo: string;
  @Prop({})
  orderInfo: orderInfo[];
  @Prop({})
  totalPriceOrders: string;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
// ProductSchema.index({ index: 'text' }, { unique: true });
