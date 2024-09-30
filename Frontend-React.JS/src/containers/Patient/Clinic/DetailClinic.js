import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailClinicById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import HomeFooter from "../../HomePage/HomeFooter";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailClinicById({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      //   this.setState({});
    }
  }

  render() {
    let { language } = this.props;
    let { arrDoctorId, dataDetailClinic } = this.state;

    return (
      <Fragment>
        <div className="detail-specialty-container">
          <HomeHeader />
          <div className="detail-specialty-body">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
                <div className="description-specialty">
                  <h3
                    style={{ fontWeight: 600 }}
                    dangerouslySetInnerHTML={{
                      __html: dataDetailClinic.name,
                    }}
                  ></h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataDetailClinic.descriptionHtml,
                    }}
                  ></div>
                </div>
              </>
            )}

            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="each-doctor" key={index}>
                    <div className="dt-content-left">
                      <div className="profile-doctor">
                        <ProfileDoctor
                          doctorId={item}
                          isShowDescriptionDoctor={true}
                          isShowLinkDetail={true}
                          isShowPrice={false}
                        />
                      </div>
                    </div>
                    <div className="dt-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule doctorIdFromParent={item} />
                      </div>
                      <div className="doctor-extra-infor">
                        <DoctorExtraInfor doctorIdFromParent={item} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
