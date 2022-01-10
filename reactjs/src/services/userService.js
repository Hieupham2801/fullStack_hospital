import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password });
};
const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const CreateNewUserService = (data) => {
  console.log("check data from services", data);
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
};
