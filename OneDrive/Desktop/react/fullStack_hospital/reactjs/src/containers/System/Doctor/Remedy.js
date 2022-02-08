import React from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";

class RemedyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }
  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
    console.log("check email", event.target.value);
  };
  handleUpload = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    let { isOpenRemedyModal, sendRemedy, dataModal, closeRemedyModal } =
      this.props;
    return (
      <Modal
        size="lg"
        isOpen={isOpenRemedyModal}
        className={"Remedy-modal-container"}
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
          <button
            type="button"
            className="close"
            aria-label="close"
            onClick={closeRemedyModal}
          >
            <span aria-hidden="true">X</span>
          </button>
        </div>

        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label>Email bệnh nhân </label>
              <input
                className="form-control"
                type="email"
                value={this.state.email}
                onChange={(event) => this.handleEmail(event)}
              />
            </div>
            <div className="col-6 form-group">
              <label>Chọn file đơn thuốc </label>
              <input
                type="file"
                onChange={(event) => this.handleUpload(event)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary px-2"
            onClick={sendRemedy}
            onClick={() => this.handleSendRemedy()}
          >
            Submit
          </Button>
          <Button color="primary px-2" onClick={closeRemedyModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
