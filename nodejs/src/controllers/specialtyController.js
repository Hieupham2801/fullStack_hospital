import specialtySevices from "../services/specialtyServices";
let CreateNewSpecialty = async (req, res) => {
  try {
    let data = await specialtySevices.CreateNewSpecialtySV(req.body);
    res.status(200).json(data);
  } catch (e) {
    console.log("check err", e);
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let fetchAllSpecialty = async (req, res) => {
  try {
    let data = await specialtySevices.fetchAllSpecialtySV(req.body);
    res.status(200).json(data);
  } catch (e) {
    console.log("check err", e);
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let fetchDetailSpecialtyById = async (req, res) => {
  try {
    let id = req.query.id;
    let location = req.query.location;
    let data = await specialtySevices.fetchDetailSpecialtyByIdSV(id, location);
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
  CreateNewSpecialty,
  fetchAllSpecialty,
  fetchDetailSpecialtyById,
};
