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

export class GuestDto {
  orderInfo: orderInterface[];
  userInfo: userInfoInterface;
  totalPriceOrders: string;
}
