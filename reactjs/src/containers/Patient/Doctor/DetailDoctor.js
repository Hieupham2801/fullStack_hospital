import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHomePage from "../../HomePage/HeaderHomePage";
import { getDetailInforDoctor } from "../../../services/userService";
import "./DoctorDetail.scss";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailDoctors: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          DetailDoctors: res.data,
        });
      }
      //   imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
  }
  componentDidUpdate() {}
  render() {
    let { DetailDoctors } = this.state;
    let nameVi = "";
    let nameEn = "";
    if (DetailDoctor) {
      // if (DetailDoctors && detai)
    }
    console.log("check state", this.state);
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
              <div className="up">{DetailDoctors.positionData}</div>
              <div className="down">
                {DetailDoctors.Markdown &&
                  DetailDoctors.Markdown.description && (
                    <span>{DetailDoctors.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor"></div>
          <div className="detail-doctor"></div>
          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
