import doctorServices from ".././services/doctorServices";
let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorServices.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from doctor top",
    });
  }
};
let getAllDoctor = async (req, res) => {
  try {
    let doctors = await doctorServices.getAllDoctors();

    return res.status(200).json(doctors);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let postInforDoctors = async (req, res) => {
  try {
    let info = await doctorServices.saveInforDoctors(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDoctorById = async (req, res) => {
  try {
    let info = await doctorServices.getDoctorByIdSV(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log("check err", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let data = await doctorServices.bulkCreateSchedules(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form server",
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let data = await doctorServices.getScheduleByDateService(
      req.query.doctorId,
      req.query.date
    );

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getExtraInfoById = async (req, res) => {
  try {
    let infor = await doctorServices.getExtraInfoDrById(req.query.doctorId);
    res.status(200).json(infor);
  } catch (e) {
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getProfileDoctorById = async (req, res) => {
  try {
    let infor = await doctorServices.getProfileDoctorByIdService(
      req.query.doctorId
    );
    res.status(200).json(infor);
  } catch (e) {
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  getDoctorById: getDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  postInforDoctors: postInforDoctors,
  getExtraInfoById,
  getProfileDoctorById,
};
