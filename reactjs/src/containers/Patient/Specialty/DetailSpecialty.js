import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { HeaderHomePage } from "../../pathComponent";

class detailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <>
        <HeaderHomePage />
        <div>Hello detail specialty</div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(detailSpecialty);
