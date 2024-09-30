import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import { CommonUtils, LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imageBase64: "",
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

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { isOpenModal, dataTime, closeRemedyModal, dataModal, sendRemedy } =
      this.props;
    let { language } = this.props;

    return (
      <Fragment>
        <Modal
          isOpen={isOpenModal}
          className="booking-modal-container"
          size="lg"
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title">Xác nhận lịch hẹn</h5>
            <button
              type="button"
              className="close"
              aria-label="close"
              onClick={closeRemedyModal}
            >
              <span aria-hidden="true" style={{ fontSize: "16px" }}>
                x
              </span>
            </button>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label>Email bệnh nhân</label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeEmail(event)}
                />
              </div>
              <div className="col-6 form-group">
                <label>Chọn file đơn thuốc</label>
                <input
                  className="form-control-file"
                  type="file"
                  onChange={(event) => this.handleOnChangeImage(event)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSendRemedy()}>
              Gửi
            </Button>
            <Button color="secondary" onClick={closeRemedyModal}>
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
