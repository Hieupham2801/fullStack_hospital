import React, { Component } from "react";
import { connect } from "react-redux";
import "./profileDoctor.scss";
import localization from "moment/locale/vi";
import { getProfileDoctorById } from "../../../../services/userService";
import { LANGUAGES } from "../../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getDataProfileDr(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  getDataProfileDr = async (doctorId) => {
    let result = {};
    if (doctorId) {
      let res = await getProfileDoctorById(doctorId);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorId !== prevProps.doctorId) {
    }
  }
  renderTimeBooking = (dataModalSchedule) => {
    let language = this.props;
    if (dataModalSchedule && !_.isEmpty(dataModalSchedule)) {
      let time =
        language === LANGUAGES.VI
          ? dataModalSchedule.timeTypeData.valueVi
          : dataModalSchedule.timeTypeData.valueEn;
      let data =
        language === LANGUAGES.VI
          ? moment
              .unix(+dataModalSchedule.date / 1000)
              .locale("vi")
              .format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataModalSchedule.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
   
      return (
        <>
          <div>
            {time} {data}
          </div>
        </>
      );
    }
  };

  render() {
    let { dataProfile } = this.state;
    let { language, isShowDescription, dataModalSchedule } = this.props;
    let nameVi = "",
      nameEn = "";
    nameVi = ` ${dataProfile.lastName} ${dataProfile.firstName}`;
    nameEn = `${dataProfile.firstName} ${dataProfile.lastName}`;
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi},  ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    

    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{ backgroundImage: `url(${dataProfile.image})` }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>

            <div className="down">
              {isShowDescription === true ? (
                <>
                  {dataProfile.Markdown && dataProfile.Markdown.description && (
                    <span>{dataProfile.Markdown.description}</span>
                  )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataModalSchedule)}</>
              )}
            </div>
          </div>
        </div>
        <div className="price">
          <span>Price: </span>
          {dataProfile &&
          dataProfile.doctor_info &&
          language === LANGUAGES.VI ? (
            <NumberFormat
              className="currency"
              value={dataProfile.doctor_info.priceData.valueVi}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"VND"}
            />
          ) : (
            ""
          )}
          {dataProfile &&
          dataProfile.doctor_info &&
          language === LANGUAGES.EN ? (
            <NumberFormat
              className="currency"
              value={dataProfile.doctor_info.priceData.valueEn}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"$"}
            />
          ) : (
            ""
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
