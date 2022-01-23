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
    return <Modal isOpen={true} className={"className"}></Modal>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
