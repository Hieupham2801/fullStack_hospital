import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HeaderHomePage from "./HeaderHomePage";
import Specialty from "./section/Specialty";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MedicalFacility from "./section/MedicalFacility";
import OutStandingDoctor from "./section/outStandingDoctor";
import Handbook from "./section/HandBook";
import About from "./section/About";
import HomeFooter from "./HomeFooter";
import "./section/HomePage.scss";

class HomePage extends Component {
  // handleAfterChange = () => {};

  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      // slickGotTo: this.handleAfterChange,
    };
    return (
      <div>
        <HeaderHomePage isShowBanner={true} />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <Handbook settings={settings} />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
