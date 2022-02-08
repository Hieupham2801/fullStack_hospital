import db from "../models/index";
require("dotenv").config();
import emailServices from "./emailServices";

let postAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.timeType || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        // send email
        await emailServices.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: "Hieu Pham",
          time: "8:00-9:00",
          doctorName: "Nguyen Pham",
          redirectLink:
            "https://www.w3schools.com/html/tryit.asp?filename=tryhtml_default",
        });
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });
        resolve({
          errCode: 0,
          errMessage: "Save user succeed",
        });
        if (user && user[0]) {
          await db.booking.create({
            statusId: "S1",
            doctorId: data.doctorId,
            patientId: user[0].id,
            date: data.date,
            timeType: data.timeType,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postAppointment,
};
