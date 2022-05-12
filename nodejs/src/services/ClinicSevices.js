import db from "../models/index";
let CreateNewClinicSV = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({ errCode: 2, errMessage: "Missing parameter" });
      } else {
        await db.clinics.create({
          descriptionHTML: data.descriptionHTML,
          name: data.name,
          descriptionMD: data.descriptionMD,
          address: data.address,
          image: data.imageBase64,
        });
        resolve({
          errCode: 0,
          errMessage: "Create new Clinic success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let fetchAllClinicSV = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.clinics.findAll();
      resolve({
        errCode: 0,
        errMessage: "fetch all Clinic success",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let fetchDetailClinicByIdSV = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.clinics.findOne({
        where: { id: id },
        attributes: ["name", "address", "descriptionHTML", "descriptionMD"],
      });
      if (data) {
        let dataClinic = [];
        dataClinic = await db.doctor_info.findAll({
          where: { clinicId: id },
          attributes: ["doctorId", "provinceId"],
        });
        data.dataClinic = dataClinic;
      } else data = {};
      resolve({
        errCode: 0,
        errMessage: "fetch detail Clinic success",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  CreateNewClinicSV,
  fetchAllClinicSV,
  fetchDetailClinicByIdSV,
};
