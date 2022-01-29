import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import "./ManageDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown table
      contentHTML: "",
      contentMarkDown: "",
      selectedOption: "",
      description: "",
      hasOldData: false,
      // save to doctor default table
      listDoctors: [],
      listPrices: [],
      listPayMent: [],
      listProvince: [],

      selectedPrices: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.getRequireDoctorInfo();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors != this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language != this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctorsa,
        "USERS"
      );
      let { resPayment, resPrice, resProvince } = this.props.dataRequire;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PAYMENT"
      );
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PROVINCE");
      this.setState({
        listDoctors: dataSelect,
        listPayMent: dataSelectPayment,
        listPrices: dataSelectPrice,
        listProvince: dataSelectProvince,
      });
    }
    if (prevProps.dataRequire != this.props.dataRequire) {
      let { resPayment, resPrice, resProvince } = this.props.dataRequire;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PAYMENT"
      );
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PROVINCE");
      this.setState({
        listPayMent: dataSelectPayment,
        listPrices: dataSelectPrice,
        listProvince: dataSelectProvince,
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
    let { hasOldData } = this.state;
    this.props.saveInforDoctor({
      contentMarkDown: this.state.contentMarkDown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPrices: this.state.selectedPrices.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listDoctors, listPrices, listPayMent, listProvince } = this.state;
    let res = await getDetailInforDoctor(selectedOption.value);

    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let nameClinic = "",
        priceId = "",
        paymentId = "",
        provinceId = "",
        addressClinic = "",
        note = "",
        selectedPrices = "",
        selectedPayment = "",
        selectedProvince = "";
      if (res.data.doctor_info) {
        let data = res.data.doctor_info;
        addressClinic = data.addressClinic;
        nameClinic = data.nameClinic;
        note = data.note;
        priceId = data.priceId;
        paymentId = data.paymentId;
        provinceId = data.provinceId;
        selectedPrices = listPrices.find((item) => {
          return item && item.value === priceId;
        });
        selectedPayment = listPayMent.find((item) => {
          return item && item.value === paymentId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
      }
      this.setState({
        contentMarkDown: markdown.contentMarkDown,
        contentHTML: markdown.contentHTML,
        description: markdown.description,
        hasOldData: true,
        note: note,
        nameClinic: nameClinic,
        addressClinic: addressClinic,
      });
    } else {
      this.setState({
        contentMarkDown: "",
        contentHTML: "",
        description: "",
        hasOldData: false,
        note: "",
        nameClinic: "",
        addressClinic: "",
      });
    }
  };
  handleChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let language = this.props.language;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let lableVi = ` ${item.lastName} ${item.firstName}`;
          let lableEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? lableVi : lableEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let lableVi = `${item.valueVi}`;
          let lableEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? lableVi : lableEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let lableVi = `${item.valueVi}`;
          let lableEn = `${item.valueEn} `;
          object.label = language === LANGUAGES.VI ? lableVi : lableEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }
    return result;
  };
  handleChangeSelectedDoctorRequire = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
    console.log("check new select", selectedOption, stateCopy);
  };
  render() {
    let { selectedOption, hasOldData, listPayMent, listPrices, listProvince } =
      this.state;
    console.log("check state", this.state);

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="manage-doctor.Title" />
        </div>
        <div className="more-info">
          <div className="content-left">
            <label>
              <FormattedMessage id="manage-doctor.Choose-doctor" />
            </label>
            <Select
              placeholder={
                <FormattedMessage id="manage-doctor.Choose-doctor" />
              }
              //  value={selectedOption}
              onChange={this.handleChange}
              options={this.state.listDoctors}
              //   className="form-control"
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="manage-doctor.Info-introduce" />
            </label>
            <textarea
              value={this.state.description}
              className="form-control "
              onChange={(event) => this.handleChangeText(event, "description")}
            ></textarea>
          </div>
        </div>
        <div className="more-info-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.Choose-price" />
            </label>
            <Select
              placeholder={<FormattedMessage id="manage-doctor.Choose-price" />}
              value={this.state.selectedPrices}
              onChange={this.handleChangeSelectedDoctorRequire}
              options={listPrices}
              name="selectedPrices"
              //   className="form-control"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.Payment-methods" />
            </label>
            <Select
              placeholder={
                <FormattedMessage id="manage-doctor.Payment-methods" />
              }
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectedDoctorRequire}
              options={listPayMent}
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.Choose-city" />
            </label>
            <Select
              placeholder={<FormattedMessage id="manage-doctor.Choose-city" />}
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectedDoctorRequire}
              options={listProvince}
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.Clinic-address" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.Clinic-name" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.Note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleChangeText(event, "note")}
              value={this.state.note}
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            value={this.state.contentMarkDown}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "btn btn-primary px-3 my-2 save-info"
              : "btn btn-warning px-3 my-2 create-info"
          }
          onClick={() => this.handleSaveMarkDown()}
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="manage-doctor.Save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="manage-doctor.Create" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    dataRequire: state.admin.dataRequire,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    getRequireDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),
    saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
