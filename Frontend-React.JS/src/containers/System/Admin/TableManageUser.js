import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import "react-markdown-editor-lite/lib/index.css";

function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        userRedux: this.props.listUsers,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };

  render() {
    let arrUsers = this.state.userRedux;
    return (
      <div style={{ paddingBottom: "50px" }}>
        <table id="TableManageUser" style={{}}>
          <tbody>
            <tr>
              <th>Email</th>
              <th>
                <FormattedMessage id="manage-user.firstname" />
              </th>
              <th>
                <FormattedMessage id="manage-user.lastname" />
              </th>
              <th>
                <FormattedMessage id="manage-user.address" />
              </th>
              <th>
                <FormattedMessage id="manage-user.action" />
              </th>
            </tr>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
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
                        onClick={() => this.handleDeleteUser(item)}
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
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
