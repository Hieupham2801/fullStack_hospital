import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/view", homeController.getHomePageEjs);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putEditCRUD);
  router.get("/delete-crud", homeController.deleteEditCRUD);
  router.post("/api/login", userController.handleLoging);
  router.get("/api/get-all-users", userController.handleGetAllUser);
  router.post("/api/create-new-users", userController.handleCreatNewUser);
  router.put("/api/edit-users", userController.handleEditUser);
  router.delete("/api/delete-users", userController.handleDeleteUser);
  router.get("/allcode", userController.getAllCode);
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctor);
  router.post("/api/save-infor-doctors", doctorController.postInforDoctors);
  router.get('/api/get-infor-doctor-by-id',doctorController.getDoctorById)
  return app.use("/", router);
};
module.exports = initWebRoutes;
// moi tao api create new users
