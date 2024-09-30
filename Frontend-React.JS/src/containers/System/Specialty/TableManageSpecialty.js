import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageSpecialty.scss";
import * as actions from "../../../store/actions";
import "react-markdown-editor-lite/lib/index.css";

// function handleEditorChange({ html, text }) {
//   console.log("handleEditorChange", html, text);
// }

class TableManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: [],
    };
  }

  async componentDidMount() {
    this.setState({
      listSpecialty: this.props.dataSpecialty,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataSpecialty !== this.props.dataSpecialty) {
      this.setState({
        listSpecialty: this.props.dataSpecialty,
      });
    }
  }

  handleDelete = async (user) => {
    this.props.handleDeleteSpecialty(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };

  render() {
    let listSpecialty = this.state.listSpecialty;
    return (
      <div style={{ paddingBottom: "50px" }}>
        <table id="TableManageUser" style={{}}>
          <tbody>
            <tr>
              <th>
                <FormattedMessage id="manage-clinic.stt" />
              </th>
              <th>
                <FormattedMessage id="manage-specialty.name-specialty" />
              </th>
              <th>Actions</th>
            </tr>

            {listSpecialty &&
              listSpecialty.length > 0 &&
              listSpecialty.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <button
                        className="btn btn-success btn-edit"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fas fa-edit fa-fw"></i>
                      </button>
                      <button
                        style={{ marginLeft: "10px" }}
                        className="btn btn-danger btn-delete"
                        onClick={() => this.handleDelete(item)}
                      >
                        <i className="far fa-trash-alt fa-fw"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
    deleteSpecialty: (id) => dispatch(actions.deleteSpecialty(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageSpecialty);
