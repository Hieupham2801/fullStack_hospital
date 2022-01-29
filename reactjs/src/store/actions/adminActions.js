import actionTypes from "./actionTypes";
import {
  GetAllCodeService,
  CreateNewUserService,
  getAllUser,
  DeleteUserService,
  EditUserService,
  getTopDoctorService,
  getAllDoctorServices,
  saveInforDoctorsServices,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch) => {
    try {
      let res = await GetAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFaided());
      }
    } catch (e) {
      dispatch(fetchGenderFaided());
      console.log("fetch gender start err", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFaided = () => ({
  type: actionTypes.FETCH_GENDER_FAIDED,
});
// export positon
export const fetchPositionStart = () => {
  return async (dispatch) => {
    try {
      let res = await GetAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFaided());
      }
    } catch (e) {
      dispatch(fetchPositionFaided());
      console.log("fetch position start err", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITON_SUCCESS,
  data: positionData,
});
export const fetchPositionFaided = () => ({
  type: actionTypes.FETCH_POSITON_FAIDED,
});
// EXPORT ROLE
export const fetchRoleStart = () => {
  return async (dispatch) => {
    try {
      let res = await GetAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFaided());
      }
    } catch (e) {
      dispatch(fetchRoleFaided());
      console.log("fetch role start err", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFaided = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});
// Create user
export const CreateNewUser = (data) => {
  return async (dispatch) => {
    try {
      let res = await CreateNewUserService(data);
      if (res && res.errCode === 0) {
        dispatch(SaveUserSuccess());
        dispatch(fetchAllUserStart());
        toast.success("Create new user success");
      } else {
        dispatch(SaveUserFailed());
      }
    } catch (e) {
      dispatch(SaveUserFailed());
      console.log("fetch new start err", e);
    }
  };
};
export const SaveUserSuccess = () => ({
  type: actionTypes.SAVE_USER_SUCCESS,
});

export const SaveUserFailed = () => ({
  type: actionTypes.SAVE_USER_FAILDED,
});
// fetch all user
export const fetchAllUserStart = () => {
  return async (dispatch) => {
    try {
      let res = await getAllUser("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailded());
      }
    } catch (e) {
      dispatch(fetchAllUserFailded());
      console.log("fetch all user start err", e);
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUserFailded = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILDED,
});
// DELETE USER
export const DeleteUserStart = (userId) => {
  return async (dispatch) => {
    try {
      let res = await DeleteUserService(userId);
      if (res && res.errCode === 0) {
        dispatch(DeleteUserSuccess());
        dispatch(fetchAllUserStart());
        toast.success("Delete user success");
      } else {
        toast.error("Delete user failded");
        dispatch(DeleteUserFailded());
      }
    } catch (e) {
      dispatch(DeleteUserFailded());
      toast.error("Delete user failded", e);
    }
  };
};
export const DeleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const DeleteUserFailded = () => ({
  type: actionTypes.DELETE_USER_FAILDED,
});
// Edit User
export const EditUserStart = (data) => {
  return async (dispatch) => {
    try {
      let res = await EditUserService(data);
      if (res && res.errCode === 0) {
        dispatch(EditUserSuccess());
        dispatch(fetchAllUserStart());

        toast.success("Edit user success");
      } else {
        dispatch(EditUserFailded());
      }
    } catch (e) {
      dispatch(EditUserFailded());
      console.log("fetch edit start err", e);
    }
  };
};
export const EditUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const EditUserFailded = () => ({
  type: actionTypes.EDIT_USER_FAILDED,
});
// Doctor
// fetch top doctor
export const fetchTopDoctor = () => {
  return async (dispatch) => {
    try {
      let res = await getTopDoctorService("");

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
        });
      }
    } catch (e) {}
  };
};
// fetch all doctor for manage doctor
export const fetchAllDoctor = () => {
  return async (dispatch) => {
    try {
      let res = await getAllDoctorServices();

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.doctors,
        });
      } else {
        toast.error("fetch doctor failded");
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
        });
      }
    } catch (e) {
      toast.error("fetch doctor failded");
    }
  };
};
// save infor doctor
export const saveInforDoctor = (data) => {
  return async (dispatch) => {
    try {
      let res = await saveInforDoctorsServices(data);
      if (res && res.errCode === 0) {
        toast.success("Save infor doctor success");
        dispatch({
          type: actionTypes.SAVE_INFOR_DOCTORS_SUCCESS,
        });
      } else {
        toast.error("Save infor doctor failded");
        dispatch({
          type: actionTypes.SAVE_INFOR_DOCTORS_FAILDED,
        });
      }
    } catch (e) {
      toast.error("Save infor doctor failded");
    }
  };
};
// fetch all hours doctor schedule
export const fetchAllScheduleTime = () => {
  return async (dispatch) => {
    try {
      let res = await GetAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_CODE_SCHEDULE_HOURS_SUCCESS,
          dataTime: res.data,
        });
      } else {
        toast.error("fetch time failded");
        dispatch({
          type: actionTypes.FETCH_ALL_CODE_SCHEDULE_HOURS_FAILDED,
        });
      }
    } catch (e) {
      toast.error("fetch time failded");
    }
  };
};
// fetch doctor price
export const getRequireDoctorInfo = () => {
  return async (dispatch) => {
    try {
      let resPrice = await GetAllCodeService("PRICE");
      let resPayment = await GetAllCodeService("PAYMENT");
      let resProvince = await GetAllCodeService("PROVINCE");
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let dataRequire = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
        };
        dispatch({
          type: actionTypes.FETCH_ALL_REQUIRE_DOCTOR_SUCCESS,
          dataRequire,
        });
      } else {
        toast.error("fetch all require doctor failded");
        dispatch({
          type: actionTypes.FETCH_ALL_REQUIRE_DOCTOR_FAILDED,
        });
      }
    } catch (e) {
      toast.error("fetch all require doctor failded");
    }
  };
};
