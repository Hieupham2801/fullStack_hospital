import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import "./userManage.scss";
import * as actions from "../../store/actions";
class modalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      password: "",
    };
    this.listenEmitter();
  }
  listenEmitter() {
    emitter.on("CLEAR_MODAL_DATA", (data) => {
      console.log("this emitter from parent", data);
    });
  }
  componentDidMount() {}
  toggle = () => {
    this.props.toogleFromParent();
  };
  handleInputUser = (event, id) => {
    let coppyState = { ...this.state };
    coppyState[id] = event.target.value;
    this.setState({
      ...coppyState,
    });
    console.log("coppy state", coppyState);
    console.log("test handle ", event.target.value, id);
  };
  checkVaidInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddInfoUser = () => {
    let isValid = this.checkVaidInput();
    if (isValid === true) {
      // call api
      this.props.createNewUser(this.state);

      console.log("modal data", this.state);
    }
  };

  render() {
    console.log("check props", this.props);
    console.log("check is open props", this.props.isOpen);

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"abcClassName"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Create new user</ModalHeader>
        <ModalBody>
          <div className="modal-user-container">
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email </label>
                <input
                  type="text"
                  value={this.state.email}
                  onChange={(event) => this.handleInputUser(event, "email")}
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={(event) => this.handleInputUser(event, "password")}
                />
              </div>
              <div className="input-container">
                <label>First Name</label>
                <input
                  type="text"
                  value={this.state.firstName}
                  onChange={(event) => this.handleInputUser(event, "firstName")}
                />
              </div>
              <div className="input-container">
                <label>Last Name</label>
                <input
                  type="text"
                  value={this.state.lastName}
                  onChange={(event) => this.handleInputUser(event, "lastName")}
                />
              </div>
              <div className="input-container max-width-input">
                <label>Address</label>
                <input
                  type="text"
                  value={this.state.address}
                  onChange={(event) => this.handleInputUser(event, "address")}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary px-2" onClick={() => this.handleAddInfoUser()}>
            Add
          </Button>
          <Button color="secondary px-2" onClick={() => this.toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(modalUser);
