import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorDetail.scss";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import BookingModal from "./Modal/BookingModal";
import { getScheduleByDate } from "../../../services/userService";
import "./DoctorSchedule.scss";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      aVailableTime: [],
    };
  }
  async componentDidMount() {
    let { language } = this.state;
    let allDays = await this.getArrayDay(language);

    this.setState({
      allDays: allDays,
    });
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = await this.getArrayDay(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (
      this.props.DetailDoctorFromParent !== prevProps.DetailDoctorFromParent
    ) {
      let allDays = this.getArrayDay(this.props.language);
      console.log("all days", allDays);
      let res = await this.props.DetailDoctorFromParent;

      this.setState({
        aVailableTime: res.data ? res.data : [],
      });
    }
  }
  getArrayDay = async (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (language === LANGUAGES.VI) {
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        obj.label = this.capitalizeFirstLetter(labelVi);
      } else {
        obj.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(obj);
    }
    console.log("check allday", allDays);

    return allDays;
  };
  handleChangeSelect = async (event) => {
    if (
      this.props.DetailDoctorFromParent &&
      this.props.DetailDoctorFromParent !== -1
    ) {
      let doctorId = this.props.DetailDoctorFromParent;
      let date = event.target.value;
      let res = await getScheduleByDate(doctorId, date);

      if (res && res.errCode === 0) {
        this.setState({
          aVailableTime: res.data ? res.data : [],
        });
      }
      console.log("check res 2", res);
    }
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    let { language } = this.props;
    console.log("check language", language);
    let { allDays, aVailableTime } = this.state;
    return (
      <>
        <div className="Doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available">
            <div className="text-calender">
              <i className="fas fa-calendar-alt">
                <span> Schedule</span>
              </i>
            </div>
            <div className="time-content">
              {aVailableTime && aVailableTime.length > 0 ? (
                aVailableTime.map((item, index) => {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn;
                  return (
                    <button
                      key={index}
                      className={
                        language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                      }
                    >
                      {timeDisplay}
                    </button>
                  );
                })
              ) : (
                <div>
                  {" "}
                  no schedule in this time , please choose another time
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
