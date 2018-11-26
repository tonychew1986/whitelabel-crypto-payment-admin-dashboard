import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';

import Toggle from 'react-toggle'
import ReactTable from 'react-table'

import UserList from '../components/UserList';
import Breadcrumb from '../components/Breadcrumb';

import axios from 'axios';

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);


class PageConsumersUsers extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    }

  }

  componentDidMount(){
    // if have either accessToken of localstorage or props then stay, else leave
    if((localStorage.getItem('accessToken') !== "" && localStorage.getItem('accessToken') !== null) || (this.props.app.accessToken !== "" && this.props.app.accessToken !== null)){
      this.props.appActions.checkNetwork();
      this.props.appActions.getUserList("user");
    }else{
      this.props.history.push('/login');
    }
  }

  _deleteUser = (userId) => {
    this.props.appActions.deleteUser(userId);
  }

  _changeUserRole = (userId, name, role) => {
    this.props.appActions.changeUserRole(userId, name, role);
  }

  render() {
    return (
      <div className={cx('page')}>
        <Breadcrumb grandparent="consumers" parent="users" child="" grandchild="" grandparentLink="/consumers" parentLink="" childLink="" grandchildLink="" />
        <div className={cx('pageInner')}>
          <div className={cx('table')}>
            <ReactTable
              data={this.props.app.userList}
              filterable
              columns={[
                {
                  Header: "Consumer Users",
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
                      accessor: "id",
                      maxWidth: 130,
                      Cell: ({value}) => (<button onClick={() => {this._deleteUser(value)}}>Delete</button>)
                    },
                    {
                      id: "changeRole",
                      accessor: "id",
                      maxWidth: 130,
                      Cell: ({value}) => (<button onClick={() => {this._changeUserRole(value)}}>Upgrade to merchant</button>)
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
export default connect(mapStateToProps, mapDispatchToProps)(PageConsumersUsers);
