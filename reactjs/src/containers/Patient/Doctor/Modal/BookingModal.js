import React from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
class BookingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { isOpenModalBooking, closeBookingModal, dataModalSchedule } =
      this.props;
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
              <i class="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body container">
            {/* {JSON.stringify(dataModalSchedule)} */}
            <div className="info-doctor"></div>
            <div className="price">Price: 500.000 VND</div>
            <div className="row">
              <div className="col-6 form-group">
                <label>Name</label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Phone Number</label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Email: </label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Address: </label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Gender</label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label> who to book an appointment for?</label>
                <input className="form-control" />
              </div>
              <div className="col-12 form-group">
                <label>Reason: </label>
                <input className="form-control" />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="btn-booking-confirm">Confirm</button>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
