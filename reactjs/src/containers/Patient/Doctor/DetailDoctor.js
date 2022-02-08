import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHomePage from "../../HomePage/HeaderHomePage";
import { LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
import "./DoctorDetail.scss";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailDoctors: {},
      currentDoctorId: -1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          DetailDoctors: res.data,
          currentDoctorId: id,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { language } = this.props;
    let { DetailDoctors } = this.state;
    let nameVi = "",
      nameEn = "";
    nameVi = ` ${DetailDoctors.lastName} ${DetailDoctors.firstName}`;
    nameEn = `${DetailDoctors.firstName} ${DetailDoctors.lastName}`;
    if (DetailDoctors && DetailDoctors.positionData) {
      nameVi = `${DetailDoctors.positionData.valueVi},  ${DetailDoctors.lastName} ${DetailDoctors.firstName}`;
      nameEn = `${DetailDoctors.positionData.valueEn}, ${DetailDoctors.firstName} ${DetailDoctors.lastName}`;
    }
    console.log("check currentDoctorId", this.state.currentDoctorId);
    return (
      <>
        <HeaderHomePage isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{ backgroundImage: `url(${DetailDoctors.image})` }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {DetailDoctors.Markdown &&
                  DetailDoctors.Markdown.description && (
                    <span>{DetailDoctors.Markdown.description}</span>
                  )}

                <div className="icon my-2">
                  <button className="btn btn-primary px-2 ">
                    <i className="far fa-thumbs-up"></i> Thích
                  </button>
                  <button className="btn btn-primary px-2 ">Chia sẻ</button>
                </div>
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule
                DetailDoctorFromParent={this.state.currentDoctorId}
              />
            </div>
            <div className="content-right">
              <DoctorExtraInfo
                GetDoctorIdFromDtDr={this.state.currentDoctorId}
              />
            </div>
          </div>
          <div className="detail-doctor">
            {DetailDoctors.Markdown && DetailDoctors.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DetailDoctors.Markdown.contentHTML,
                }}
              ></div>
            )}
          </div>
          <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
