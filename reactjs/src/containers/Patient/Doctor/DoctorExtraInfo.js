import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import { getExtraInforDr } from "../../../services/userService";
import NumberFormat from "react-number-format";
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowdetailInfo: false,
      extraInfo: {},
    };
  }

  async componentDidMount() {
    let res = await getExtraInforDr(this.props.GetDoctorIdFromDtDr);
    if (res && res.errCode === 0) {
      this.setState({
        extraInfo: res.data,
      });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    let res = await getExtraInforDr(this.props.GetDoctorIdFromDtDr);
    if (res && res.errCode === 0) {
      this.setState({
        extraInfo: res.data,
      });
    }
  }
  showHideDetaiInfo = (status) => {
    this.setState({
      isShowdetailInfo: status,
    });
  };
  render() {
    let { isShowdetailInfo, extraInfo } = this.state;
    let { language } = this.props;

    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">Address Clinic</div>
          <div className="name-clinic">
            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
          </div>
          <div className="detail-address">
            <span> Địa chỉ phòng khám </span>
            {extraInfo && extraInfo.addressClinic
              ? extraInfo.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowdetailInfo === false && (
            <div className="short-info">
              Price:
              {extraInfo &&
                extraInfo.priceData &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    className="currency"
                    value={extraInfo.priceData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VND"}
                  />
                )}
              {extraInfo &&
                extraInfo.priceData &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    value={extraInfo.priceData.valueEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"$"}
                    className="currency"
                  />
                )}
              <span
                className="detail"
                onClick={() => this.showHideDetaiInfo(true)}
              >
                Xem chi tiet
              </span>
            </div>
          )}
          {isShowdetailInfo === true && (
            <>
              <div className="title-price">Price</div>
              <div className="detail-info">
                <div className="price">
                  <span className="left">Price: </span>
                  <span className="right">
                    {extraInfo &&
                      extraInfo.priceData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          className="currency"
                          value={extraInfo.priceData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"VND"}
                        />
                      )}
                    {extraInfo &&
                      extraInfo.priceData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          value={extraInfo.priceData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                          className="currency"
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  {extraInfo && extraInfo.note ? extraInfo.note : ""}
                </div>
              </div>
              <div className="payment">
                <span className="method-payment">Payment method: </span>
                {extraInfo && extraInfo.paymentData && language === LANGUAGES.VI
                  ? extraInfo.paymentData.valueVi
                  : ""}
                {extraInfo && extraInfo.paymentData && language === LANGUAGES.EN
                  ? extraInfo.paymentData.valueEn
                  : ""}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetaiInfo(false)}>
                  Hide price
                </span>
              </div>
            </>
          )}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
