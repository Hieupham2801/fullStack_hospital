import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { HeaderHomePage } from "../../pathComponent";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../../Patient/Doctor/Modal/profileDoctor";

class detailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [74, 75, 76],
    };
  }

  componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { arrDoctorId } = this.state;
    console.log("check arrDoctorid", arrDoctorId);

    return (
      <div className="detail-specialty-container">
        <HeaderHomePage />
        <div className="detail-sp-body">
          <div className="description-sp"></div>

          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <div className="profile-doctor">
                      <ProfileDoctor doctorId={item} isShowDescription={true} />
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
