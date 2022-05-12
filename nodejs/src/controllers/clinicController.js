import ClinicSevices from "../services/ClinicSevices";
let CreateNewClinic = async (req, res) => {
  try {
    let data = await ClinicSevices.CreateNewClinicSV(req.body);
    res.status(200).json(data);
  } catch (e) {
    console.log("check err", e);
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let fetchAllClinic = async (req, res) => {
  try {
    let data = await ClinicSevices.fetchAllClinicSV(req.body);
    res.status(200).json(data);
  } catch (e) {
    console.log("check err", e);
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let fetchDetailClinicById = async (req, res) => {
  try {
    let data = await ClinicSevices.fetchDetailClinicByIdSV(req.query.id);
    res.status(200).json(data);
  } catch (e) {
    console.log("check err", e);
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  CreateNewClinic,
  fetchAllClinic,
  fetchDetailClinicById,
};
