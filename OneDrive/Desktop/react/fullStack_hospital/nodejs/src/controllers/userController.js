import userService from "../services/userServices";

let handleLoging = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  //check email exist
  //password nhap vao ko dung
  //return userInfor
  // access_token :JWT json web token

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUser = async (req, res) => {
  let id = req.query.id; // all or single

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing require parameter",
      users: [],
    });
  }
  let users = await userService.getAllUser(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};
let handleCreatNewUser = async (req, res) => {
  let messege = await userService.createNewUser(req.body);
  return res.status(200).json(messege);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUser(data);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await userService.deleteUser(req.body.id);
};
let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("get all code error", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  handleLoging: handleLoging,
  handleGetAllUser: handleGetAllUser,
  handleCreatNewUser: handleCreatNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
