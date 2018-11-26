import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';

import Toggle from 'react-toggle'
import ReactTable from 'react-table'
import Modal from 'react-modal';

import UserList from '../components/UserList';
import Breadcrumb from '../components/Breadcrumb';

import axios from 'axios';

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);


class PageAdminsUsers extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      modalIsOpen: false,
      selectedUserId: ""
    }

  }

  componentDidMount(){
    // if have either accessToken of localstorage or props then stay, else leave
    if((localStorage.getItem('accessToken') !== "" && localStorage.getItem('accessToken') !== null) || (this.props.app.accessToken !== "" && this.props.app.accessToken !== null)){
      this.props.appActions.checkNetwork();
      this.props.appActions.getUserList("admin");
    }else{
      this.props.history.push('/login');
    }
  }

  _deleteUser = () => {
    this._closeModal();
    this.props.appActions.deleteUser(this.state.selectedUserId);
    this.props.appActions.deleteFinancialAccount(this.state.selectedUserId);
  }

  _deleteUserModal = (userId) => {
    this.setState({
      modalIsOpen: true,
      selectedUserId: userId
    });
  }

  _openModal = () => {
    this.setState({modalIsOpen: true});
    //console.log();
  }

  _afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  _closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className={cx('page')}>
        <Breadcrumb grandparent="admins" parent="users" child="" grandchild="" grandparentLink="/admins" parentLink="" childLink="" grandchildLink="" />
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this._afterOpenModal}
          onRequestClose={this._closeModal}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
          shouldCloseOnOverlayClick={true}
        >
          <div className={cx('modalInner')}>
            <div className={cx('modalClose')} onClick={() => this._closeModal()}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACpSURBVFhH7Y9BDoAgDAR5hn/U//ob0E2WxBBs2grqoXNByrZTUxAEvyfnvJZSFl7VoAe9vPqgvJznblmCcvSg179EM0i1hKdHxDLQkjWhGazJPEISSG9D6Yl6Ncbn0ApflVcgqmLwqhxA9tkCEFU5zus33hibAwStsFdjfCySSHobgkagybiwDLZkVXgGenpuOQdsnkHIXpbYWPbBJcx/wSWeyYMgmE9KBw7bHRvo8+x4AAAAAElFTkSuQmCC" />
            </div>
            <div className={cx('modalContent')}>
              <div className={cx('modalContentTitle')}>
                Are you sure you want to delete this user?
              </div>
              <div className={cx('modalContentDescription')}>
                This transaction is irreversible.
              </div>
              <div className={cx('modalContentActions')}>
                <div className={cx('modalContentAction')}>
                  <button onClick={() => this._deleteUser()}>Yes. Delete it</button>
                </div>
                <div className={cx('modalContentAction')}>
                  <button className={cx('negative')} onClick={() => this._closeModal()}>No.</button>
                </div>
                <div className={cx('clear')}></div>
              </div>
            </div>
          </div>
        </Modal>
        <div className={cx('pageInner')}>
          <div className={cx('table')}>
            <div className={cx('tableHeader')}>
              Admin Users
            </div>
            <div className={cx('tableInner')}>
              <ReactTable
                data={this.props.app.userList}
                filterable
                columns={[
                  {
                    columns: [
                      {
                        Header: "Primary Id",
                        accessor: "id",
                        maxWidth: 100
                      },
                      {
                        Header: "User Id",
                        accessor: "userId",
                        width: 180
                      },
                      {
                        Header: "Name",
                        accessor: "name",
                        width: 180
                      },
                      {
                        Header: "Role",
                        accessor: "role",
                        maxWidth: 100
                      },
                      {
                        Header: "Email",
                        accessor: "email",
                        maxWidth: 130
                      },
                      {
                        id: "delete",
                        accessor: "userId",
                        maxWidth: 130,
                        Cell: ({value}) => (<button onClick={() => {this._deleteUserModal(value)}}>Delete</button>)
                      }
                    ]
                  }
                ]}
                defaultSorted={[
                  {
                    id: "name",
                    desc: true
                  }
                ]}
                defaultPageSize={20}
                style={{
                  height: "500px"
                }}
                className="-striped -highlight"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
    return {
        app: state.app
    };
}
function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageAdminsUsers);
