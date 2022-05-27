interface userInfoInterface {
  FullName: string;
  PhoneNumber: string;
  Note: string;
  Email: string;
  Address: string;
}

interface orderInterface {
  title: string;
  price: string;
  amount: number;
  description: string;
  id: string;
  // image: "/cuong1.png";
}
enum StatusOrder {
  process = 1,
  delivery = 2,
  success = 3,
  denied = 4,
}
export class GuestDto {
  orderInfo: orderInterface[];
  userInfo: userInfoInterface;
  totalPriceOrders: string;
  statusOrder: StatusOrder;
}
