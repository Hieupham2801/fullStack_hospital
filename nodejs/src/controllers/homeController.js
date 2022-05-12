import db from "../models/index";
import user from "../models/user";
import CRUDservices from "../services/CRUD";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};
let getHomePageEjs = (req, res) => {
  return res.send("hello homepage");
};
let getCRUD = (rq, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDservices.createNewUser(req.body);
  console.log(message);
  return res.send("Create New user success");
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDservices.getAllUser();
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDservices.getUserInforById(userId);

    return res.render("EditUserInfor.ejs", {
      user: userData,
    });
  } else {
    return res.send("get edit crud fail");
  }
};
let putEditCRUD = async (req, res) => {
  let data = req.body;
  let alluser = await CRUDservices.updateCRUD(data);
  return res.render("displayCRUD.ejs", {
    dataTable: alluser,
  });
};
let deleteEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    await CRUDservices.deleteCRUD(userId);
    return res.send("delete the user succed");
  } else {
    return res.send("delete the user unsucced");
  }
};
module.exports = {
  getHomePage: getHomePage,
  getHomePageEjs: getHomePageEjs,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putEditCRUD: putEditCRUD,
  deleteEditCRUD: deleteEditCRUD,
};
