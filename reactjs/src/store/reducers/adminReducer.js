import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  role: [],
  position: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allTime: [],
  dataRequire: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      console.log("fire fetch gender start by action success", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIDED:
      console.log("fire fetch gender start by action faided", action);

      state.isLoadingGender = false;
      state.genders = [];

      return {
        ...state,
      };
    // position
    case actionTypes.FETCH_POSITON_SUCCESS:
      state.position = action.data;
      console.log("fire fetch position start by action success", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITON_FAIDED:
      console.log("fire fetch position start by action faided", action);
      state.position = [];
      return {
        ...state,
      };
    // role
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.role = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILDED:
      state.role = [];
      return {
        ...state,
      };
    // fetch all  users
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;

      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILDED:
      console.log("fire fetch all user start by action faided", action);
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
      state.topDoctors = [];
      console.log("fire fetch top doctor start by action failded", action);
      return {
        ...state,
      };
    // fetch all doctor
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.dataDr;

      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
      state.allDoctors = [];
      console.log("fire fetch all doctor start by action failded", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CODE_SCHEDULE_HOURS_SUCCESS:
      state.allTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CODE_SCHEDULE_HOURS_FAILDED:
      state.allTime = [];
      console.log("fire fetch all schedule start by action failded", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_REQUIRE_DOCTOR_SUCCESS:
      state.dataRequire = action.dataRequire;

      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_REQUIRE_DOCTOR_FAILDED:
      state.dataPrice = [];
      state.dataPayment = [];
      state.dataProvince = [];
      console.log(
        "fire fetch all require doctor start by action failded",
        action
      );
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
