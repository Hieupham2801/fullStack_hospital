import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import "./Specialty.scss";
import outStandingDoctor from "./outStandingDoctor";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    console.log("check res", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data,
      });
    }
  }
  handleViewSpecialty = (item) => {
    console.log("check specialty ", item);
    this.props.history.push(`detail-specialty/${item.id}`);
  };
  render() {
    let { dataSpecialty } = this.state;
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="home-header.Popular-specialty" />
            </span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="section-customize specialty-child"
                      key={index}
                      onClick={() => this.handleViewSpecialty(item)}
                    >
                      <div
                        className="bg-image section-specialty"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="specialty-name">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
          <outStandingDoctor nameSpecialty={dataSpecialty.name} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
