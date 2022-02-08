import patientServices from "../services/patientServices";
let postInforPatient = async (req, res) => {
  try {
    let data = await patientServices.postAppointment(req.body);
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
  postInforPatient,
};
