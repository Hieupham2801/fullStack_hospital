import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import "./userManage.scss";
import _ from "lodash";
class modalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        id:'',    
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      password: "",
    };
  }

  componentDidMount() {
    let { currentUser } = this.props;
    console.log("did mounting edit modal", this.props.currentUser);
    if (currentUser && !_.isEmpty(currentUser)) {
      this.setState({
          id:currentUser.id,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: currentUser.address,
      });
    }
  }
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
    let arrInput = ["email", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkVaidInput();
    if (isValid === true) {
      // call api
      this.props.editUser(this.state);
      console.log("modal data", this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"abcClassName"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
        <ModalBody>
          <div className="modal-user-container">
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email </label>
                <input
                  type="text"
                  value={this.state.email}
                  disabled
                  onChange={(event) => this.handleInputUser(event, "email")}
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  disabled
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
          <Button color="primary px-2" onClick={() => this.handleSaveUser()}>
            Save
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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(modalEditUser);
