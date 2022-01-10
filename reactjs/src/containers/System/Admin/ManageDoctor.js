import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import "./ManageDoctor.scss";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkDown: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors != this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language != this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkDown: text,
    });
  };
  handleSaveMarkDown = () => {
    this.props.saveInforDoctor({
      contentMarkDown: this.state.contentMarkDown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
    });
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };
  handleChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  buildDataInputSelect = (inputData) => {
    let result = [];
    let language = this.props.language;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let lableVi = ` ${item.lastName} ${item.firstName}`;
        let lableEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? lableVi : lableEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  render() {
    let { selectedOption } = this.state;

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Add new Infor Doctor</div>
        <div className="more-info">
          <div className="content-left">
            <label>Choose doctor</label>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={this.state.listDoctors}
              //   className="form-control"
            />
          </div>
          <div className="content-right">
            <label>Infor introduce</label>
            <textarea
              value={this.state.description}
              className="form-control "
              rows="4"
              onChange={(event) => this.handleChangeDesc(event)}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="btn btn-primary px-3 my-2"
          onClick={() => this.handleSaveMarkDown()}
        >
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
