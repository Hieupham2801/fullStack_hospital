import db from "../models/index";
let CreateNewSpecialtySV = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({ errCode: 2, errMessage: "Missing parameter" });
      } else {
        await db.specialties.create({
          descriptionHTML: data.descriptionHTML,
          image: data.imageBase64,
          descriptionMD: data.descriptionMD,
          name: data.name,
        });
        resolve({
          errCode: 0,
          errMessage: "Create new specialty success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let fetchAllSpecialtySV = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.specialties.findAll();
      resolve({
        errCode: 0,
        errMessage: "fetch all specialty success",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let fetchDetailSpecialtyByIdSV = (id, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !location) {
        resolve({ errCode: 2, errMessage: "Missing parameter" });
      } else {
        let data = await db.specialties.findOne({
          where: { id: id },

          attributes: ["descriptionHTML", "descriptionMD"],
        });
        if (data) {
          let doctorSpecialty = [];
          if (location === "All") {
            doctorSpecialty = await db.doctor_info.findAll({
              where: { specialtyId: id },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            doctorSpecialty = await db.doctor_info.findAll({
              where: { specialtyId: id, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
          }
          data.doctorSpecialty = doctorSpecialty;
        } else data = {};
        resolve({ errCode: 0, errMessage: "OK", data });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  CreateNewSpecialtySV,
  fetchAllSpecialtySV,
  fetchDetailSpecialtyByIdSV,
};
