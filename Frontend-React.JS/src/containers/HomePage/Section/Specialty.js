import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Specialty.scss";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
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
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      //   this.setState({});
    }
  }

  handleViewDetailSpecialty = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`);
  };

  render() {
    let { language } = this.props;
    let { dataSpecialty } = this.state;
    console.log(dataSpecialty);

    return (
      <div id="speciality" className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="home-page.specialty" />
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
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="section-customize specialty-child"
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div
                        className="bg-image section-specialty "
                        style={{
                          backgroundImage: `url(${item.image})`,
                          borderRadius: "10px",
                        }}
                      />
                      <div className="specialty-name">{item.name}</div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
