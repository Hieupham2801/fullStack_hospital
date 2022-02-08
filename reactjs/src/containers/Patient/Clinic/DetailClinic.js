import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { getDetailClinicById } from "../../../services/userService";
import _ from "lodash";
import { HeaderHomePage } from "../../pathComponent";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/Modal/profileDoctor";
import "./DetailClinic.scss";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailClinic: [],
      arrDoctorId: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailClinicById({
        id: id,
      });
      console.log("check res ", res);
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => arrDoctorId.push(item.doctorId));
          }
        }

        this.setState({
          dataDetailClinic: data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    console.log("this state", this.state);
    let { language } = this.props;
    return (
      <div className="detail-clinic-container">
        <HeaderHomePage />
        <div className="detail-cn-body">
          <div className="description-cn">
            {dataDetailClinic && dataDetailClinic.descriptionHTML && (
              <>
                <div>{dataDetailClinic.name}</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic.descriptionHTML,
                  }}
                ></div>
              </>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
