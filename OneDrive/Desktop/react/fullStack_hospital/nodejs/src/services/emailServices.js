require("dotenv").config;
import nodemailer from "nodemailer";
let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP_USER, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hieu Pham -" <byn2801@gmail.com> ', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: `<h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn đã nhận được email này vì đã đặt lịch khám bệnh online trên website Booking </p>
    <div><b>Thời gian: ${dataSend.time} </b></div>
    <div><b>Bác Sĩ: ${dataSend.doctorName} </b></div>
    <p>Nếu các thông tin trên là đúng sự thật vui lòng click vào 
    link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh
     </p>
     <div><a href=${dataSend.redirectLink} target="_blank">Click Here</a></div>
     <div>Xin cảm ơn</div>
    `, // html body
  });
};
module.exports = {
  sendSimpleEmail,
};
