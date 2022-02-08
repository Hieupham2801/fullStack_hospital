import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import "./userManage.scss";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";

import {
  getAllUser,
  CreateNewUserService,
  DeleteUserService,
  EditUserService,
} from "../../services/userService.js";
import ModalUser from "./modalUser";
import ModalEditUser from "./modalEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenUser: false,
      isOpenEditUser: false,
      userEdit: {},
    };
  }
  async componentDidMount() {
    await this.getAllUserFromReact();
  }
  handleAddNewUser = () => {
    this.setState({
      isOpenUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenUser: !this.state.isOpenUser,
    });
  };
  toggleEditUserModal = () => {
    this.setState({
      isOpenEditUser: !this.state.isOpenEditUser,
    });
  };

  getAllUserFromReact = async () => {
    let response = await getAllUser("All");
    console.log("check get user", response);
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  createNewUser = async (data) => {
    try {
      let response = await CreateNewUserService(data);
      if (response && response !== 0) {
        toast.success("create new user is success");
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenUser: false,
        });
        // this.props.fetchUserRedux();
        emitter.emit("CLEAR_MODAL_DATA", { id: "your id" });
      }
      console.log("reponse create user", response);
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteUser = async (user) => {
    try {
      let res = await DeleteUserService(user.id);
      if (res && res.errCode === 0) {
        toast.success("Delete user is successed");
        await this.getAllUserFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUser = (user) => {
    this.setState({
      isOpenEditUser: true,
      userEdit: user,
    });
  };
  DoEditUser = async (user) => {
    try {
      let res = await EditUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenEditUser: false,
        });
        await this.getAllUserFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let { arrUsers } = this.state;
    console.log("check render", this.state);
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenUser}
          toogleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenEditUser}
            toogleFromParent={this.toggleEditUserModal}
            currentUser={this.state.userEdit}
            editUser={this.DoEditUser}
          />
        )}
        <div className="title text-center">manage user with Hieu</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-2 mx-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add New Users
          </button>
        </div>
        <div className="user-table mt-3 mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>
                  <FormattedMessage id="header.Email" />
                </th>
                <th>
                  <FormattedMessage id="header.First-Name" />
                </th>
                <th>
                  <FormattedMessage id="header.Last-Name" />
                </th>
                <th>
                  <FormattedMessage id="header.Address" />
                </th>
                <th>
                  <FormattedMessage id="header.Action" />
                </th>
              </tr>

              {arrUsers.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash-alt mx-1"></i>
                      </button>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
