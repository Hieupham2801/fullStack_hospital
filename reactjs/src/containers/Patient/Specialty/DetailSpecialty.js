import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { HeaderHomePage } from "../../pathComponent";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../../Patient/Doctor/Modal/profileDoctor";
import { LANGUAGES } from "../../../utils";
import {
  getDetailSpecialtyById,
  GetAllCodeService,
} from "../../../services/userService";
import _ from "lodash";

class detailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailSpecialtyById({
        id: id,
        location: "ALL",
      });
      let resProvince = await GetAllCodeService("PROVINCE");
      console.log("check res", resProvince);
      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => arrDoctorId.push(item.doctorId));
          }
        }
        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "ALL",
            valueVi: "Toàn quốc",
          });
        }
        this.setState({
          dataDetailSpecialty: data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleSearchLocation = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let location = event.target.value;
      let id = this.props.match.params.id;
      let res = await getDetailSpecialtyById({
        id: id,
        location: location,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => arrDoctorId.push(item.doctorId));
          }
        }
        this.setState({
          dataDetailSpecialty: data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
    let { language } = this.props;

    return (
      <div className="detail-specialty-container">
        <HeaderHomePage />
        <div className="detail-sp-body">
          <div className="description-sp">
            {dataDetailSpecialty && dataDetailSpecialty.descriptionHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <div className="search-sp-doctor">
            <select onChange={(event) => this.handleSearchLocation(event)}>
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>

          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescription={true}
                        isShowLinkDetail={true}
                        // isShowPrice={false}
                      />
                    </div>
                  </div>
                  <div className="dt-content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule DetailDoctorFromParent={item} />
                    </div>
                    <div className="doctor-extra-info">
                      <DoctorExtraInfo GetDoctorIdFromDtDr={item} />
                    </div>
                  </div>
                </div>
              );
            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(detailSpecialty);
