import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyEmail } from "../../services/userService";
import { HeaderHomePage } from "../pathComponent";
import "./VerifyEmail.scss";

class verifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      // call api verify email
      let res = await postVerifyEmail({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HeaderHomePage />
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>Loading Data...</div>
          ) : (
            <div>
              {errCode === 0 ? (
                <div className="infor-booking">
                  Xác nhận lịch hẹn thành công
                </div>
              ) : (
                <div className="infor-booking">
                  lịch hẹn không có hoặc đã được kích hoạt
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
