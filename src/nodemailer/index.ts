const nodemailer = require('nodemailer');

async function MailService(orderInfo, userInfo, totalPriceOrders) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  orderInfo.map((instance) => {
    console.log('INSTANCE ORDER INFO', instance.title);
  });

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sashimeomeo1', // generated ethereal user
      pass: 'nguyencuongAz1', // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Sashimeomeo Shop 👻" <sashimeomeo1@gmail.com>', // sender address
    to: 'ffgcuong@gmail.com', // list of receivers
    subject: 'Đơn đặt hàng', // Subject line
    text: 'Hello world?', // plain text body
    html: `<b>Có đơn đặt hàng từ người dùng có tên : ${userInfo.FullName}
    </b>
    <div>
    Sản phẩm đặt hàng ${orderInfo.map((instance) => {
      return `
      (
        <br/>
        <p>${instance.title} với số lượng : ${instance.amount} </p>
        <br/>
      )
      `;
      // return `${instance.title} với số lượng : ${instance.amount}`;
    })}
    </div>
    <br />
    <div>
      <p>Số Điện Thoại : ${userInfo.PhoneNumber} </p>
      <p>Địa Chỉ : ${userInfo.Address} </p>
    </div>
    <b>Tổng tiền của đơn đặt hàng  : ${totalPriceOrders}
    </b>
  
    `, // html body
  });
  return info;

  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export default MailService;
