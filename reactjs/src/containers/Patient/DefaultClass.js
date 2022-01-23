import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {}
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
