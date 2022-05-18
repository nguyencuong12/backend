import { Injectable } from '@nestjs/common';
import { GuestDto } from './dto/orderInterface';
import { InjectModel } from '@nestjs/mongoose';
import { Guest, GuestDocument } from './guest.schema';
import { Model } from 'mongoose';
import MailService from 'src/nodemailer';
const login = require('facebook-chat-api');

@Injectable()
export class GuestService {
  constructor(
    @InjectModel(Guest.name) private guestModel: Model<GuestDocument>,
  ) {} // @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  async orderProducts(info: GuestDto) {
    try {
      let { orderInfo, userInfo, totalPriceOrders } = info;
      // console.log('INFORMATION', info);
      console.log('INFORMATION', info);
      // const newOrders = new this.guestModel(info);
      // await newOrders.save();
      // let proccessSendMail = await MailService();

      let processSendMail = MailService(orderInfo, userInfo, totalPriceOrders);
      return processSendMail;
    } catch (err) {
      console.log('Error');
    }
  }
}
