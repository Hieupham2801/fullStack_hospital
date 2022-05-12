import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }
  async componentDidMount() {
    await this.props.fetchUserRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.ListUsers !== this.props.ListUsers) {
      this.setState({
        usersRedux: this.props.ListUsers,
      });
    }
  }
  handleDeleteUser = async (user) => {
    this.props.deleteUserRedux(user.id);
    await this.props.fetchUserRedux();
  };
  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
    console.log("check edit user", user);
  };
  render() {
    let { ListUsers } = this.props;
    let { usersRedux } = this.state;

    return (
      <>
        <table id="TableManageUser">
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
            {usersRedux &&
              usersRedux.length > 0 &&
              usersRedux.map((item, index) => {
                return (
                  <tr key={index}>
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
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ListUsers: state.admin.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.DeleteUserStart(id)),
    EditUserRedux: (data) => dispatch(actions.EditUserStart(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
