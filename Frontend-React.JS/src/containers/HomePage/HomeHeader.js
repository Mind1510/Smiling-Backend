import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";
import { Image } from "antd";
import Slider from "react-slick";
import slider1 from "../../assets/slider1.png";
import slider2 from "../../assets/sl5.jpg";
import slider3 from "../../assets/sl7.jpg";
import slider4 from "../../assets/sl3.jpg";
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrImages: [slider1, slider2, slider3, slider4],
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.dataModal !== prevProps.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  goToLogin = () => {
    this.props.processLogout();
    if (this.props.history) {
      this.props.history.push(`/login`);
    }
  };

  smoothScrollTo = (id) => {
    // if (this.props.history) {
    //   this.props.history.push(`/home`);
    //   return;
    // }
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  handleBackHome = () => {
    if (this.props.history) {
      this.returnToHome();
    }
  };

  render() {
    let language = this.props.language;
    let { arrImages } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
    };

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars fa-fw"></i>
              <div
                className="header-logo"
                onClick={() => this.handleBackHome()}
              ></div>
            </div>

            {this.props.isShowMenu == true && (
              <div className="center-content" style={{ padding: "0 50px" }}>
                <div className="child-content">
                  <div>
                    <a
                      href="#"
                      onClick={() => this.smoothScrollTo("speciality")}
                    >
                      <FormattedMessage id="home-header.speciality" />
                    </a>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="home-header.search-doctor" />
                  </div>
                </div>
                <div className="child-content">
                  <div>
                    <a
                      href="#"
                      onClick={() => this.smoothScrollTo("MedicalFacility")}
                    >
                      <FormattedMessage id="home-header.health-facility" />
                    </a>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="home-header.choose-clinic" />
                  </div>
                </div>
                <div className="child-content">
                  <div>
                    <a
                      href="#"
                      onClick={() => this.smoothScrollTo("outstanding")}
                    >
                      <FormattedMessage id="home-header.doctor" />
                    </a>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="home-header.select-doctor" />
                  </div>
                </div>
                {/* <div className="child-content">
                  <div>
                    <a href="#" onClick={() => this.smoothScrollTo("home")}>
                      <FormattedMessage id="home-header.fee" />
                    </a>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="home-header.check-health" />
                  </div>
                </div> */}
              </div>
            )}

            <div style={{ float: "left" }} className="right-content">
              <div
                className={
                  language === LANGUAGES.VI
                    ? "flag language-vi active"
                    : "flag language-vi"
                }
              >
                <span
                  onClick={() => {
                    this.changeLanguage(LANGUAGES.VI);
                  }}
                >
                  VN
                </span>
              </div>

              <div
                className={
                  language === LANGUAGES.EN
                    ? "flag language-en active"
                    : "flag language-en"
                }
              >
                <span
                  onClick={() => {
                    this.changeLanguage(LANGUAGES.EN);
                  }}
                >
                  EN
                </span>
              </div>

              <a className="support" onClick={() => this.goToLogin()}>
                <FormattedMessage id="home-header.login" />
              </a>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div id="home" className="home-header-banner">
            <Slider {...settings} className="slider-home">
              {arrImages.map((image) => {
                return (
                  <Image
                    className="img-slider"
                    src={image}
                    alt="slider"
                    preview={false}
                    width="100%"
                    height="450px"
                  />
                );
              })}
            </Slider>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
