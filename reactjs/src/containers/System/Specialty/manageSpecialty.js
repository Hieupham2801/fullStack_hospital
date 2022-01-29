import React, { Component } from "react";
import { connect } from "react-redux";
import "./manageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class manageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionMD: "",
      descriptionHTML: "",
    };
  }
  // change input value
  handleOnChangeInput = (event, id) => {
    let stateCoppy = { ...this.state };
    stateCoppy[id] = event.target.value;
    this.setState({
      ...stateCoppy,
    });
    console.log("check event", event);
  };
  // save markdown
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMD: text,
    });
  };
  // save upload file
  handleUpload = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imageBase64: base64,
      });
    }
  };
  // save state
  handleSave = async () => {
    let res = await createNewSpecialty(this.state);

    if (res && res.errCode === 0) {
      toast.success("add new specialty succeed");
    } else toast.error("add new specialty failded");
  };

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Manage Specialty</div>
        <div className="add-new-specialty row">
          <div className="col-6 form group">
            <lable>Tên chuyên khoa</lable>
            <input
              className="form-control"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form group">
            <lable>Ảnh chuyên khoa</lable>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleUpload(event)}
            />
          </div>

          <div className="col-12 my-2">
            <MdEditor
              value={this.state.descriptionMD}
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
            />
          </div>
          <div className="col-12 ">
            <button
              className="btn btn--save-specialty btn-primary mx-2 px-2"
              onClick={() => this.handleSave()}
            >
              Save
            </button>
          </div>
        </div>
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
