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

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIDED:
      state.isLoadingGender = false;
      state.genders = [];

      return {
        ...state,
      };
    // position
    case actionTypes.FETCH_POSITON_SUCCESS:
      state.position = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_POSITON_FAIDED:
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

      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
