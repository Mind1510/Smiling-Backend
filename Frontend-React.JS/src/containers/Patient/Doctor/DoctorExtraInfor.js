import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { getExtraInforDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: [],
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      //   this.setState({});
    }

    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHideDetailInf = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    console.log(this.state);
    return (
      <Fragment>
        <div className="doctor-extra-infor-container">
          <div className="content-up">
            <div className="text-address">
              <FormattedMessage id="patient.detail-doctor.address-check" />
            </div>
            <div className="name-clinic">
              {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
            </div>
            <div className="detail-address">
              {extraInfor && extraInfor.addressClinic
                ? extraInfor.addressClinic
                : ""}
            </div>
          </div>
          <div className="content-down">
            {isShowDetailInfor === false ? (
              <div className="short-infor">
                <FormattedMessage id="patient.detail-doctor.price-check" />
                {":"}
                {extraInfor &&
                  extraInfor.priceTypeData &&
                  language === LANGUAGES.VI && (
                    <NumberFormat
                      value={extraInfor.priceTypeData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"VND"}
                      className="currency"
                    />
                  )}
                {extraInfor &&
                  extraInfor.priceTypeData &&
                  language === LANGUAGES.EN && (
                    <NumberFormat
                      value={extraInfor.priceTypeData.valueEn}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"$"}
                      className="currency"
                    />
                  )}
                <span
                  className="detail"
                  onClick={() => this.showHideDetailInf(true)}
                >
                  <FormattedMessage id="patient.detail-doctor.detail-view" />
                </span>
              </div>
            ) : (
              <div>
                <div className="title-price">
                  <FormattedMessage id="patient.detail-doctor.price-check" />
                </div>
                <div className="detail-infor">
                  <div className="price">
                    <span className="left">
                      <FormattedMessage id="patient.detail-doctor.price-check" />
                    </span>
                    <span className="right">
                      {extraInfor &&
                        extraInfor.priceTypeData &&
                        language === LANGUAGES.VI && (
                          <NumberFormat
                            value={extraInfor.priceTypeData.valueVi}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"VND"}
                            className="currency"
                          />
                        )}
                      {extraInfor &&
                        extraInfor.priceTypeData &&
                        language === LANGUAGES.EN && (
                          <NumberFormat
                            value={extraInfor.priceTypeData.valueEn}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"$"}
                          />
                        )}
                    </span>
                  </div>
                  <div className="note">
                    {extraInfor && extraInfor.note ? extraInfor.note : ""}
                  </div>
                </div>
                <div className="payment">
                  <FormattedMessage id="patient.detail-doctor.payment-method" />

                  {extraInfor &&
                  extraInfor.paymentTypeData &&
                  language === LANGUAGES.VI
                    ? " " + extraInfor.paymentTypeData.valueVi
                    : " " + extraInfor.paymentTypeData.valueEn}
                </div>
                <div className="hide-price">
                  <span onClick={() => this.showHideDetailInf(false)}>
                    <FormattedMessage id="patient.detail-doctor.hide-price" />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
