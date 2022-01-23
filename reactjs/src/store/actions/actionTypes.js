const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",

  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",
  //admin
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAIDED: "FETCH_GENDER_FAIDED",
  // admin position
  FETCH_POSITON_SUCCESS: "FETCH_POSITON_SUCCESS",
  FETCH_POSITON_FAIDED: "FETCH_POSITON_FAIDED",
  // admin role
  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILDED: "FETCH_ROLE_FAILDED",
  // save user
  SAVE_USER_SUCCESS: "SAVE_USER_SUCCESS",
  SAVE_USER_FAILDED: "SAVE_USER_FAILDED",
  // fetch all user
  FETCH_ALL_USER_SUCCESS: "FETCH_ALL_USER_SUCCESS",
  FETCH_ALL_USER_FAILDED: "FETCH_ALL_USER_FAILDED",
  // Delete User
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILDED: "DELETE_USER_FAILDED",
  // Edit user
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILDED: "EDIT_USER_FAILDED",
  // fetch top doctor
  FETCH_TOP_DOCTOR_SUCCESS: "FETCH_TOP_DOCTOR_SUCCESS",
  FETCH_TOP_DOCTOR_FAILDED: "FETCH_TOP_DOCTOR_FAILDED",
  // fetch all doctor for manage-doctor
  FETCH_ALL_DOCTORS_SUCCESS: "FETCH_ALL_DOCTORS_SUCCESS",
  FETCH_ALL_DOCTORS_FAILDED: "FETCH_ALL_DOCTORS_FAILDED",
  // save infor doctor
  SAVE_INFOR_DOCTORS_SUCCESS: "SAVE_INFOR_DOCTORS_SUCCESS",
  SAVE_INFOR_DOCTORS_FAILDED: "SAVE_INFOR_DOCTORS_FAILDED",
  // fetch all code schedule hours
  FETCH_ALL_CODE_SCHEDULE_HOURS_SUCCESS:
    "FETCH_ALL_CODE_SCHEDULE_HOURS_SUCCESS",
  FETCH_ALL_CODE_SCHEDULE_HOURS_FAILDED:
    "FETCH_ALL_CODE_SCHEDULE_HOURS_FAILDED",
  // GET ALL REQUIRE DOCTOR
  FETCH_ALL_REQUIRE_DOCTOR_SUCCESS: "FETCH_ALL_REQUIRE_DOCTOR_SUCCESS",
  FETCH_ALL_REQUIRE_DOCTOR_FAILDED: "FETCH_ALL_REQUIRE_DOCTOR_FAILDED",
});

export default actionTypes;
