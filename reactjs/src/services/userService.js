import axios from "../axios";
const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password });
};
const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const CreateNewUserService = (data) => {
  return axios.post("/api/create-new-users", data);
};
const DeleteUserService = (userId) => {
  return axios.delete("/api/delete-users", { data: { id: userId } });
};
const EditUserService = (inputData) => {
  return axios.put("/api/edit-users", inputData);
};
const GetAllCodeService = (data) => {
  return axios.get(`/allcode?type=${data}`);
};
const getTopDoctorService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctorServices = () => {
  return axios.get("/api/get-all-doctors");
};
const saveInforDoctorsServices = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};
const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-infor-doctor-by-id?id=${id}`);
};
const bulkCreateSchedule = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDr = (doctorId) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
  return axios.get(`api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBooking = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
const postVerifyEmail = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};
//specialty
const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};
const getAllSpecialty = () => {
  return axios.get("/api/get-all-info-specialty");
};
const getDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-info-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
//clinic
const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

export {
  handleLoginApi,
  getAllUser,
  CreateNewUserService,
  DeleteUserService,
  EditUserService,
  GetAllCodeService,
  getTopDoctorService,
  getAllDoctorServices,
  saveInforDoctorsServices,
  getDetailInforDoctor,
  bulkCreateSchedule,
  getScheduleByDate,
  getExtraInforDr,
  getProfileDoctorById,
  postPatientBooking,
  postVerifyEmail,
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  createNewClinic,
};
