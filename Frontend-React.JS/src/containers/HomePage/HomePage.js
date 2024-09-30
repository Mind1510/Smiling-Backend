import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.scss";

class HomePage extends Component {
  handleAfterChange = () => {};

  render() {
    let setting = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      afterChange: this.handleAfterChange,
    };

    return (
      <div>
        <HomeHeader isShowMenu={true} isShowBanner={true} />
        <Specialty setting={setting} />
        <MedicalFacility setting={setting} />
        <OutStandingDoctor setting={setting} />
        {/* <HandBook setting={setting} /> */}
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
