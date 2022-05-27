import { Injectable } from '@nestjs/common';
import { GuestDto } from './dto/orderInterface';
import { InjectModel } from '@nestjs/mongoose';
import { Guest, GuestDocument } from './guest.schema';
import { AdminDocument, Admin } from 'src/admin/admin.schema';
import { Model } from 'mongoose';
import MailService from 'src/nodemailer';
const login = require('facebook-chat-api');

@Injectable()
export class GuestService {
  constructor(
    @InjectModel(Guest.name) private guestModel: Model<GuestDocument>,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {} // @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  async orderProducts(info: GuestDto) {
    try {
      let { orderInfo, userInfo, totalPriceOrders } = info;
      enum StatusOrder {
        process = 1,
        delivery = 2,
        success = 3,
        denied = 4,
      }
      // console.log('INFORMATION', info);
      info.statusOrder = StatusOrder.process;
      const newOrders = new this.guestModel(info);
      console.log('NEW ORDER', newOrders);
      const admin = new this.adminModel({ guestOrder: newOrders });
      console.log('ADMIN', admin);
      await admin.save();

      let processSendMail = MailService(orderInfo, userInfo, totalPriceOrders);
      return processSendMail;
    } catch (err) {
      console.log('Error');
    }
  }
}
