import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class OutStanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };

  render() {
    let { language } = this.props;
    let arrDoctors = this.state.arrDoctors;
    console.log(arrDoctors);

    return (
      <div
        id="outstanding"
        className="section-share section-outstanding-doctor"
      >
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="home-page.out-standing-doctor" />
            </span>
            <button
              className="btn-section"
              style={{
                borderRadius: "10px",
                background: "#daf3f6",
                color: "#34929e",
              }}
            >
              <FormattedMessage id="home-page.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.setting}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi} ${item.firstName} ${item.lastName} `;
                  let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName} `;
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                      style={{
                        borderRadius: "10px",
                      }}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          />
                        </div>
                        <div className="position text-center">
                          <div className="doctor-name">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>Cơ Xương Khớp</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStanding)
);
