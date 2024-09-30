import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      console.log(res.data);
      this.setState({
        dataClinic: res.data,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      //   this.setState({});
    }
  }

  handleViewDetailSpecialty = (item) => {
    this.props.history.push(`/detail-clinic/${item.id}`);
  };

  render() {
    let { dataClinic } = this.state;
    return (
      <div
        id="MedicalFacility"
        className="section-share section-medical-facility"
      >
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="home-page.MedicalFacility" />
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
              {dataClinic &&
                dataClinic.length > 0 &&
                dataClinic.map((item, index) => {
                  return (
                    <div
                      className="section-customize specialty-child"
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div
                        className="bg-image section-medical-facility"
                        style={{
                          borderRadius: "10px",
                          backgroundImage: `url(${item.image})`,
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
