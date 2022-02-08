import db from "../models/index";
require("dotenv").config();
import _, { reject } from "lodash";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject({
        errCode: 1,
      });
    }
  });
};
let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: { exclude: ["password", "image"] },
      });
      resolve({ errCode: 0, doctors });
    } catch (e) {
      reject(e);
    }
  });
};
// selectedPrices: this.state.selectedPrices.value,
// selectedPayment: this.state.selectedPayment.value,
// selectedProvince: this.state.selectedProvince.value,
// nameClinic: this.state,
// addressClinic: this.state,
// note: this.state,
let saveInforDoctors = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.contentHTML ||
        !inputData.contentMarkDown ||
        !inputData.doctorId ||
        !inputData.action ||
        !inputData.selectedPrices ||
        !inputData.selectedPayment ||
        !inputData.selectedProvince ||
        !inputData.nameClinic ||
        !inputData.addressClinic ||
        !inputData.note
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkDown: inputData.contentMarkDown,
            description: inputData.description,
            doctorId: inputData.doctorId,
          });

          resolve({ errCode: 0, errMessage: "create data doctor suceed" });
        } else if (inputData.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { doctorId: inputData.doctorId },
            raw: false,
          });
          resolve({ errCode: 0, errMessage: "Edit data doctor suceed" });
          if (doctorMarkdown) {
            doctorMarkdown.contentHTML = inputData.contentHTML;
            doctorMarkdown.contentMarkDown = inputData.contentMarkDown;
            doctorMarkdown.description = inputData.description;
            await doctorMarkdown.save();
          }
        }
        let doctorInfo = await db.doctor_info.findOne({
          where: { doctorId: inputData.doctorId },
          raw: false,
        });
        if (doctorInfo) {
          // update
          (doctorInfo.doctorId = inputData.doctorId),
            (doctorInfo.priceId = inputData.selectedPrices),
            (doctorInfo.paymentId = inputData.selectedPayment),
            (doctorInfo.provinceId = inputData.selectedProvince),
            (doctorInfo.addressClinic = inputData.addressClinic),
            (doctorInfo.nameClinic = inputData.nameClinic),
            (doctorInfo.note = inputData.note),
            await doctorInfo.save();
        } else {
          //create
          await db.doctor_info.create({
            doctorId: inputData.doctorId,
            priceId: inputData.selectedPrices,
            paymentId: inputData.selectedPayment,
            provinceId: inputData.selectedProvince,
            addressClinic: inputData.addressClinic,
            nameClinic: inputData.nameClinic,
            note: inputData.note,
          });
        }
        resolve({
          errCode: 0,
          errMessage: "save doctor_info succeed",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDoctorByIdSV = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({ errCode: 1, errMessage: "Missing require parameter" });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: { exclude: ["password"] },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkDown"],
            },
            {
              model: db.doctor_info,
              attributes: { exclude: ["id", "doctorId"] },
              include: [
                {
                  model: db.Allcode,
                  as: "priceData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) {
          data = {};
        }
        resolve({ errCode: 0, data: data });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let bulkCreateSchedules = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing require parameter",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        let existing = await db.schedules.findAll({
          where: { doctorId: data.doctorId, date: data.formatedDate },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });

        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });
        if (toCreate && toCreate.length > 0) {
          await db.schedules.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMessage: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getScheduleByDateService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let dataSchedule = await db.schedules.findAll({
          where: { doctorId: doctorId, date: date },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });

        if (!dataSchedule) dataSchedule = [];

        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getExtraInfoDrById = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing require parameter",
        });
      } else {
        let data = await db.doctor_info.findOne({
          where: {
            doctorId: doctorId,
          },
          attributes: { exclude: ["id", "doctorId"] },
          include: [
            {
              model: db.Allcode,
              as: "priceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (!data) {
          data = {};
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getProfileDoctorByIdService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: -1,
          errMessage: "Missing require parameter ",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: doctorId },
          attributes: { exclude: ["password"] },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkDown"],
            },

            {
              model: db.doctor_info,
              attributes: { exclude: ["id", "doctorId"] },
              include: [
                {
                  model: db.Allcode,
                  as: "priceData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) {
          data = {};
        }
        resolve({ errCode: 0, data: data });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  saveInforDoctors: saveInforDoctors,
  getDoctorByIdSV: getDoctorByIdSV,
  bulkCreateSchedules: bulkCreateSchedules,
  getScheduleByDateService: getScheduleByDateService,
  getExtraInfoDrById,
  getProfileDoctorByIdService,
};
