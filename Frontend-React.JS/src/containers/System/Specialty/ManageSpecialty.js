import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import {
  createNewSpecialty,
  deleteSpecialtyService,
  getAllSpecialty,
  updateSpecialtyService,
} from "../../../services/userService";
import { toast } from "react-toastify";
import TableManageSpecialty from "./TableManageSpecialty";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHtml: "",
      descriptionMarkdown: "",
      action: CRUD_ACTIONS.CREATE,
      specialtyEdit: "",
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    this.getTableSpecialty();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      //   this.setState({});
    }
  }

  getTableSpecialty = async () => {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data,
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

  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Create New Specialty Succeed!");
      this.getTableSpecialty();
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
        action: CRUD_ACTIONS.CREATE,
      });
    } else {
      toast.error("Create New Specialty error!");
    }
  };

  handleEditUserFromParent = (user) => {
    let image = "";
    if (user.imageBase64) {
      image = new Buffer(user.imageBase64, "base64").toString("binary");
    }
    this.setState({
      name: user.name,
      imageBase64: image,
      descriptionHtml: user.descriptionHtml,
      descriptionMarkdown: user.descriptionMarkdown,
      action: CRUD_ACTIONS.EDIT,
      specialtyEdit: user.id,
    });
  };

  handleEditSpecialty = async () => {
    let res = await updateSpecialtyService(this.state);
    if (res && res.errCode === 0) {
      toast.success("Update Specialty Succeed!");
      this.getTableSpecialty();
      this.setState({
        specialtyEdit: "",
        name: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
        action: CRUD_ACTIONS.CREATE,
      });
    } else {
      toast.error("Update Specialty error!");
    }
  };

  handleDeleteSpecialty = async (id) => {
    let res = await deleteSpecialtyService(id);
    if (res && res.errCode === 0) {
      toast.success("Delete Specialty Succeed!");
      this.getTableSpecialty();
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
      toast.error("Delete Specialty error!");
    }
  };

  handleSaveSpecialty = () => {
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.handleSaveNewSpecialty();
    } else if (action === CRUD_ACTIONS.EDIT) {
      this.handleEditSpecialty();
    } else {
      this.handleDeleteSpecialty();
    }
  };

  render() {
    let { language } = this.props;
    return (
      <Fragment>
        <div className="manage-specialty-container">
          <div className="title">
            <FormattedMessage id="manage-specialty.title" />
          </div>
          <div className="add-new-specialty row px-5">
            <div className="col-6 form-group ">
              <label>
                <FormattedMessage id="manage-specialty.name-specialty" />
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
                <FormattedMessage id="manage-specialty.image-specialty" />
              </label>
              <input
                className="form-control-file "
                type="file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>

            <div className="col-11 ">
              <MdEditor
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
            <div className="col-11 my-3 mx-2 ">
              <button
                className={
                  this.state.action === CRUD_ACTIONS.EDIT
                    ? "btn btn-warning btn-save-specialty"
                    : "btn btn-primary btn-save-specialty"
                }
                onClick={() => this.handleSaveSpecialty()}
              >
                <FormattedMessage id="manage-specialty.save-infor" />
              </button>
            </div>
            <div className="col-8">
              <TableManageSpecialty
                handleEditUserFromParent={this.handleEditUserFromParent}
                handleDeleteSpecialty={this.handleDeleteSpecialty}
                getAllSpecialty={this.getTableSpecialty}
                action={this.state.action}
                dataSpecialty={this.state.dataSpecialty}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
