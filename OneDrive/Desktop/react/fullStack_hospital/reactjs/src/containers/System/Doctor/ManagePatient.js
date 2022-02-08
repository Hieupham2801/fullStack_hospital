import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getListPatientForDoctor,
  sendRemedy,
} from "../../../services/userService";
import moment from "moment";
import Remedy from "./Remedy";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: {},
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    this.getDataPatient();
  }
  getDataPatient = async () => {
    let user = this.props.user;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getListPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });

    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  handleOnChangeDatePicker = (data) => {
    this.setState(
      {
        currentDate: data[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {}
  handleConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };
  // open/ close modal
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };
  sendRemedy = async (dataFromChild) => {
    let dataModal = this.state.dataModal;
    this.setState({
      isOpenRemedyModal: true,
    });
    let res = await sendRemedy({
      email: dataFromChild.email,
      imgBase64: dataFromChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("send remedy succeeds");
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("send remedy error");
    }
  };

  render() {
    let { currentDate, dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let language = this.props.language;

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
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
                  <tbody>
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
                                onClick={() => this.handleConfirm(item)}
                              >
                                Submit
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Remedy
            isOpenRemedyModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
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
