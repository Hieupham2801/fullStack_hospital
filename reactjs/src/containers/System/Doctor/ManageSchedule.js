import React, { Component } from "react";
import { formatedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, dateFormat } from "../../../utils";
import * as actions from "../../../store/actions";
import Select from "react-select";
import "./ManageSchedule.scss";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { bulkCreateSchedule } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.fetchAllScheduleTime();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
      console.log("dataSelect:", dataSelect);
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allTime !== this.props.allTime) {
      let data = this.props.allTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let language = this.props.language;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let lableVi = ` ${item.lastName} ${item.firstName}`;
        let lableEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? lableVi : lableEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleChange = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  handleOnChangeDatePicker = (data) => {
    this.setState({
      currentDate: data[0],
    });
  };
  handleClickButtonTime = (time) => {
    console.log("check time", time);
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveChange = async () => {
    let { rangeTime, currentDate, selectedDoctor } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }
    if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid Selected !");
      return;
    }
    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let formatedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = item.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time");
        return;
      }
    }
    let res = await bulkCreateSchedule({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatedDate: formatedDate,
    });
    if (res && res.errCode === 0) {
      toast.success("Save info succeed");
    } else {
      toast.error("Save info fail");
    }
  };
  render() {
    const { isLoggedIn, language } = this.props;
    let { rangeTime, listDoctors } = this.state;

    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <div className="manage-schedule-container">
        <div className="manage-schedule-title">
          <h3>
            <formattedMessage id="manage-schedule.Title" />
          </h3>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <formattedMessage id="manage-schedule.Choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={listDoctors}
                //   className="form-control"
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <formattedMessage id="manage-schedule.Choose-day" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule active"
                          : "btn btn-schedue"
                      }
                      key={index}
                      onClick={() => this.handleClickButtonTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary px-2 my-2 btn-save"
                onClick={() => this.handleSaveChange()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allTime: state.admin.allTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
