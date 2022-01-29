import React, { Component } from "react";
import { connect } from "react-redux";
import "./manageSpecialty.scss";

class manageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Manage Specialty</div>
        <div className="btn-add-new-specialty">
          <button>Add new</button>
        </div>
        <div className="all-specialty"></div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(manageSpecialty);
