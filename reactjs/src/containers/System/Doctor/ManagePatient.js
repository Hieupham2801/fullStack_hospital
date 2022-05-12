import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getListPatientForDoctor } from "../../../services/userService";
import moment from "moment";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: {},
    };
  }
  //

  async componentDidMount() {
    let user = this.props.user;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();

    this.getDataPatient(user, formatedDate);
  }
  getDataPatient = async (user, formatedDate) => {
    let res = await getListPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    console.log("check res", res.data);
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  handleOnChangeDatePicker = (data) => {
    this.setState({
      currentDate: data[0],
    });
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  handleConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
    };
  };

  render() {
    let { currentDate, dataPatient } = this.state;
    let language = this.props.language;
    return (
      <div className="manage-pt-container">
        <div className="m-pt-title">Manage Patient</div>
        <div className="manage-patient-body row">
          <div className="col-4 form-group">
            <label>Choose date</label>
            <DatePicker
              onChange={this.handleOnChangeDatePicker}
              className="form-control"
              value={currentDate}
            />
          </div>
          <div className="col-12 table-patient">
            <table style={{ width: "100%" }}>
              <tr>
                <th>STT</th>
                <td>Time</td>
                <th>Full Name</th>
                <td>Address</td>
                <th>Gender</th>
                <th>Action</th>
              </tr>
              {dataPatient &&
                dataPatient.length > 0 &&
                dataPatient.map((item, index) => {
                  let time =
                    language === LANGUAGES.VI
                      ? item.timeTypeDataPatient.valueVi
                      : item.timeTypeDataPatient.valueEn;
                  // let gender =
                  //   language === LANGUAGES.VI
                  //     ? item.patientData.genderData.valueVi
                  //     : item.patientData.genderData.valueEn;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{time}</td>
                      <td>{item.patientData.firstName}</td>
                      <td>{item.patientData.address}</td>
                      <td></td>
                      {/* <td>{gender}</td> */}
                      <td>
                        <button
                          className="btn btn-primary px-2 mx-2"
                          onClick={() => this.handleConfirm()}
                        >
                          Submit
                        </button>
                        <button
                          className="btn btn-secondary px-2"
                          onClick={() => this.handleSend(item)}
                        >
                          Send
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
