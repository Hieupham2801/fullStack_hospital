import React, { Component } from "react";
import { connect } from "react-redux";
import "./HeaderHome.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";

import { withRouter } from "react-router-dom";
class HeaderHomePage extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  handleReturnHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    let language = this.props.language;

    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.handleReturnHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="childe-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.specialty" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.SearchDoctor" />
                </div>
              </div>
              <div className="childe-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.Health-facility" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.Choose-clinic" />
                </div>
              </div>
              <></>
              <div className="childe-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.Doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.Choose-doctor" />
                </div>
              </div>
              <div className="childe-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.examination-package" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.General-health-check" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="home-header.Support" />
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="banner-top">
              <div className="title1">
                <FormattedMessage id="home-header.Medical-background" />
              </div>
              <div className="title2">
                <FormattedMessage id="home-header.Health-care" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder={
                    language === LANGUAGES.VI ? "Find Doctor" : "Tim bac si"
                  }
                />
              </div>
            </div>
            <div className="banner-bot">
              <div className="options">
                <div className="optins-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-header.Specialist-examination" />
                  </div>
                </div>
                <div className="optins-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-header.Remote-examination" />
                  </div>
                </div>
                <div className="optins-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-header.General-examination" />
                  </div>
                </div>
                <div className="optins-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-header.Medical-test" />
                  </div>
                </div>
                <div className="optins-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-header.Mental-health" />
                  </div>
                </div>
                <div className="optins-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-header.Dental-examination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
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
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderHomePage)
);
