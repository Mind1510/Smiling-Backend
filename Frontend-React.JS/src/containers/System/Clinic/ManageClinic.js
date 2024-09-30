import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import {
  createNewClinic,
  deleteClinicService,
  getAllClinic,
  updateClinicService,
} from "../../../services/userService";
import { toast } from "react-toastify";
import TableManageClinic from "./TableManageClinic";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHtml: "",
      descriptionMarkdown: "",
      action: CRUD_ACTIONS.CREATE,
      dataClinic: [],
      clinicEdit: "",
    };
  }

  async componentDidMount() {
    this.getTableClinic();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      //   this.setState({});
    }
  }

  getTableClinic = async () => {
    let res = await getAllClinic();
    console.log(res);
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data,
      });
    }
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHtml: html,
      descriptionMarkdown: text,
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

  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Create New Clinic Succeed!");
      this.getTableClinic();
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Create New Clinic error!");
    }
  };

  handleEditUserFromParent = (user) => {
    let image = "";
    if (user.imageBase64) {
      image = new Buffer(user.imageBase64, "base64").toString("binary");
    }
    this.setState({
      name: user.name,
      address: user.address,
      imageBase64: image,
      descriptionHtml: user.descriptionHtml,
      descriptionMarkdown: user.descriptionMarkdown,
      action: CRUD_ACTIONS.EDIT,
      clinicEdit: user.id,
    });
  };

  handleEditClinic = async () => {
    let res = await updateClinicService(this.state);
    if (res && res.errCode === 0) {
      toast.success("Update Clinic Succeed!");
      this.getTableClinic();
      this.setState({
        specialtyEdit: "",
        name: "",
        address: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
        action: CRUD_ACTIONS.CREATE,
      });
    } else {
      toast.error("Update Clinic error!");
    }
  };

  handleDeleteClinic = async (id) => {
    let res = await deleteClinicService(id);
    if (res && res.errCode === 0) {
      toast.success("Delete Clinic Succeed!");
      this.getTableClinic();
      this.setState({
        specialtyEdit: "",
        name: "",
        address: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
        action: CRUD_ACTIONS.CREATE,
      });
    } else {
      toast.error("Delete Clinic error!");
    }
  };

  handleSaveClinic = () => {
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.handleSaveNewClinic();
    } else if (action === CRUD_ACTIONS.EDIT) {
      this.handleEditClinic();
    } else {
      this.handleDeleteClinic();
    }
  };

  render() {
    let { language } = this.props;
    return (
      <Fragment>
        <div className="manage-clinic-container">
          <div className="title">
            <FormattedMessage id="manage-clinic.title" />
          </div>
          <div className="add-new-specialty row px-5">
            <div className="col-6 form-group left">
              <label>
                <FormattedMessage id="manage-clinic.name-clinic" />
              </label>
              <input
                className="form-control"
                type="text"
                value={this.state.name}
                onChange={(event) => this.handleOnChangeInput(event, "name")}
              />
            </div>
            <div className="col-5 form-group">
              <label>
                <FormattedMessage id="manage-clinic.image-clinic" />
              </label>
              <input
                className="form-control-file "
                type="file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
            <div className="form-group col-6">
              <label>Địa chỉ</label>
              <input
                className="form-control"
                type="text"
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event, "address")}
              />
            </div>
            <div className="col-12">
              <MdEditor
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
            <div className="col-12 my-3">
              <button
                className={
                  this.state.action === CRUD_ACTIONS.EDIT
                    ? "btn btn-warning btn-save-specialty"
                    : "btn btn-primary btn-save-specialty"
                }
                onClick={() => this.handleSaveClinic()}
              >
                <FormattedMessage id="manage-clinic.save-infor" />
              </button>
            </div>
            <div className="col-10 ">
              <TableManageClinic
                handleEditUserFromParent={this.handleEditUserFromParent}
                handleDeleteClinic={this.handleDeleteClinic}
                getAllClinic={this.getTableClinic}
                action={this.state.action}
                dataClinic={this.state.dataClinic}
              />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
