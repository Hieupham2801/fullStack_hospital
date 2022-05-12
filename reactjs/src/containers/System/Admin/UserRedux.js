import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./userRedux.scss";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      preViewImg: "",
      isOpen: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action: "",
      UserEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    this.props.fetchUserRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: this.props.positionRedux,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
    if (prevProps.ListUsers !== this.props.ListUsers) {
      let arrRole = this.props.roleRedux;
      let arrPosition = this.props.positionRedux;
      let arrGenders = this.props.genderRedux;

      this.setState({
        // email: "",
        // password: "",
        // firstName: "",
        // lastName: "",
        // phonenumber: "",
        // address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        preViewImg: "",
      });
    }
  }
  handleUpload = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log("check base64", base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        preViewImg: objectUrl,
        avatar: base64,
      });
    }
  };
  openPreviewImg = () => {
    if (!this.state.preViewImg) return;
    this.setState({
      isOpen: true,
    });
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    console.log("check event", event.target.value);
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "firstName",
      "lastName",
      "address",
      "phonenumber",
      "password",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        alert("Missing required parameter: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux
      this.props.CreateNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,

        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      // FIRE REDUX EDIT USER
      this.props.EditUserRedux({
        id: this.state.UserEditId,
        email: this.state.email,
        passowrd: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
      });
    }

    this.props.fetchUserRedux();
  };
  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "hard code",
      firstName: user.firstName,
      lastName: user.lastName,
      phonenumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      action: CRUD_ACTIONS.EDIT,
      preViewImg: imageBase64,
      UserEditId: user.id,
    });
  };
  render() {
    let { genderArr, roleArr, positionArr } = this.state;
    let { language } = this.props;
    let {
      email,
      address,
      firstName,
      lastName,
      phonenumber,
      role,
      position,
      avatar,
      gender,
      password,
    } = this.state;
    console.log("check lastName", lastName);

    return (
      <div className="user-redux-container">
        <div className="title">User redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <label>
                  <FormattedMessage id="manage-user.Add-user" />
                </label>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.Email" />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                  onChange={(event) => this.onChangeInput(event, "email")}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.First-Name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(event) => this.onChangeInput(event, "firstName")}
                />
              </div>
              <div className="col-3 ">
                <label>
                  <FormattedMessage id="manage-user.Last-Name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(event) => this.onChangeInput(event, "lastName")}
                />
              </div>
              <div className="col-3 ">
                <label>
                  <FormattedMessage id="manage-user.Password" />
                </label>
                <input
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) => this.onChangeInput(event, "password")}
                />
              </div>
              <div className="col-3 my-2">
                <label>
                  <FormattedMessage id="manage-user.Address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => this.onChangeInput(event, "address")}
                />
              </div>
              <div className="col-9 my-2">
                <label>
                  <FormattedMessage id="manage-user.Phone-number" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phonenumber}
                  onChange={(event) => this.onChangeInput(event, "phonenumber")}
                />
              </div>
              <div className="col-3 my-2">
                <label>
                  <FormattedMessage id="manage-user.Gender" />
                </label>
                <select
                  value={gender}
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "gender")}
                >
                  {genderArr &&
                    genderArr.length > 0 &&
                    genderArr.map((item, index) => {
                      return (
                        <>
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 my-2">
                <label>
                  <FormattedMessage id="manage-user.Position" />
                </label>
                <select
                  value={position}
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "position")}
                >
                  {positionArr &&
                    positionArr.length > 0 &&
                    positionArr.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 my-2">
                <label>
                  <FormattedMessage id="manage-user.Role" />
                </label>
                <select
                  value={role}
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "role")}
                >
                  {roleArr &&
                    roleArr.length > 0 &&
                    roleArr.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 my-2">
                <label>
                  <FormattedMessage id="manage-user.Image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleUpload(event)}
                  />
                  <label className="lable-upload" htmlFor="previewImg">
                    Upload <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-img"
                    style={{ backgroundImage: `url(${this.state.preViewImg})` }}
                    onClick={() => this.openPreviewImg()}
                  ></div>
                </div>
              </div>
              <div className="col-12 my-2">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning px-3 my-3"
                      : "btn btn-primary px-3 my-3"
                  }
                  onClick={() => {
                    this.handleSaveUser();
                  }}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.Edit" />
                  ) : (
                    <FormattedMessage id="manage-user.Save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.preViewImg}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    roleRedux: state.admin.role,
    positionRedux: state.admin.position,
    ListUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    CreateNewUser: (data) => dispatch(actions.CreateNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    EditUserRedux: (data) => dispatch(actions.EditUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
