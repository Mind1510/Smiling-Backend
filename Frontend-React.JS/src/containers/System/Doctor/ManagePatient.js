import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();

    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.language !== prevProps.language) {
      //   this.setState({});
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      imageBase64: dataChild.imageBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });

    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send Remedy Succeed!");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Send Remedy Succeed!");
      console.log("error send remedy");
    }
  };

  render() {
    let { language } = this.props;
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    return (
      <Fragment>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading...."
        >
          <div className="manage-patient-container">
            <div className="m-p-title title">
              <FormattedMessage id="manage-patient.title" />
            </div>

            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-patient.choose-day" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>

              <div className="col-12 table-manage-patient">
                <table id="TableManageUser">
                  <tbody>
                    <tr>
                      <th>
                        <FormattedMessage id="manage-patient.id" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.time" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.name" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.gender" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.address" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.phone" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.action" />
                      </th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let gender =
                          language === LANGUAGES.VI
                            ? item.patientData.genderData.valueVi
                            : item.patientData.genderData.valueEn;
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVi
                            : item.timeTypeDataPatient.valueEn;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{gender}</td>
                            <td>{item.patientData.address}</td>
                            <td>{item.patientData.phoneNumber}</td>

                            <td>
                              <button
                                className="mp-btn-confirm btn btn-primary"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                <FormattedMessage id="manage-patient.confirm" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7" style={{ textAlign: "center" }}>
                          <FormattedMessage id="manage-patient.nodata" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
