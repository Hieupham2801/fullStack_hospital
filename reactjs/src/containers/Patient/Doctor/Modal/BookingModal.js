import React from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "./profileDoctor";
import _ from "lodash";
import { LANGUAGES } from "../../../../utils";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { postPatientBooking } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
class BookingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      genders: "",
      birthDay: "",
      doctorId: "",
      timeType: "",
      selectedGender: "",
    };
  }
  // change input value state info patient
  handleChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCoppy = { ...this.state };
    stateCoppy[id] = valueInput;
    this.setState({
      ...stateCoppy,
    });
  };
  // change birthday of patient
  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthDay: date[0],
    });
  };
  // build data suitable for reactSelect
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let obj = {};
        obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;
        result.push(obj);
      });
    }
    return result;
  };
  buildDoctorName = (dataModalSchedule) => {
    let { language } = this.props;
    if (dataModalSchedule && !_.isEmpty(dataModalSchedule)) {
      let lastName = dataModalSchedule.doctorData.lastName;
      let firstName = dataModalSchedule.doctorData.firstName;
      let fullName =
        language === LANGUAGES.VI
          ? `${lastName} ${firstName}`
          : `${firstName} ${lastName}`;

      return fullName;
    }
    return "";
  };
  componentDidMount() {
    this.props.fetchGenderStart();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    let dataModalSchedule = this.props.dataModalSchedule;
    if (dataModalSchedule !== prevProps.dataModalSchedule) {
      if (dataModalSchedule && !_.isEmpty(dataModalSchedule)) {
        let doctorId = dataModalSchedule.doctorId;
        this.setState({
          doctorId: doctorId,
          timeType: dataModalSchedule.timeType,
        });
      }
    }
  }
  // selected change sex
  handleSelectedSex = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };
  //event comfirm booking
  handleConfirmBooking = async (data) => {
    // valid input
    let timeString = this.buildDataTimeBooking(this.props.dataModalSchedule);
    let doctorName = this.buildDoctorName(this.props.dataModalSchedule);
    console.log(
      "check full name",
      this.buildDoctorName(this.props.dataModalSchedule)
    );
    let language = this.props.language;
    let date = new Date(this.state.birthDay).getTime();
    let res = await postPatientBooking({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      timeString: timeString,
      doctorName: doctorName,
      language: language,
    });
    if (res && res.errCode === 0) {
      toast.success("booking a appointment succeed");
    } else {
      toast.error("booking a appointment failded");
    }
    console.log("check confirm booking", this.state);
  };
  // render timebooking
  buildDataTimeBooking = (dataModalSchedule) => {
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

      return ` ${time} ${data}`;
    }
    return "";
  };
  render() {
    let { fullName, phoneNumber, email, address, reason, genders, birthDay } =
      this.state;
    let { isOpenModalBooking, closeBookingModal, dataModalSchedule, language } =
      this.props;

    let doctorId = "";
    if (dataModalSchedule && !_.isEmpty(dataModalSchedule)) {
      doctorId = dataModalSchedule.doctorId;
    }

    return (
      <Modal
        size="lg"
        isOpen={isOpenModalBooking}
        className={"booking-modal-container"}
        centered
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">Information booking schedule</span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body container">
            {/* {JSON.stringify(dataModalSchedule)} */}
            <div className="info-doctor">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescription={false}
                dataModalSchedule={dataModalSchedule}
                isShowLinkDetail={false}
                isShowPrice={true}
              />
            </div>

            <div className="row">
              <div className="col-6 form-group">
                <label>Name</label>
                <input
                  className="form-control"
                  value={fullName}
                  onChange={(event) =>
                    this.handleChangeInput(event, "fullName")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>Phone Number</label>
                <input
                  className="form-control"
                  value={phoneNumber}
                  onChange={(event) =>
                    this.handleChangeInput(event, "phoneNumber")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>Email: </label>
                <input
                  className="form-control"
                  value={email}
                  onChange={(event) => this.handleChangeInput(event, "email")}
                />
              </div>
              <div className="col-6 form-group">
                <label>Address: </label>
                <input
                  className="form-control"
                  value={address}
                  onChange={(event) => this.handleChangeInput(event, "address")}
                />
              </div>
              <div className="col-6 form-group">
                <label>Gender</label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleSelectedSex}
                  options={genders}
                  name="selectedGender"
                />
              </div>
              <div className="col-6 form-group">
                <label>Date of birth</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={birthDay}
                />
              </div>
              <div className="col-12 form-group">
                <label>Reason: </label>
                <input
                  className="form-control"
                  value={reason}
                  onChange={(event) => this.handleChangeInput(event, "reason")}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confirm"
              onClick={() => this.handleConfirmBooking()}
            >
              Confirm
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genders: state.admin.genders,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
