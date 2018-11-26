import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';

import Toggle from 'react-toggle'
import ReactTable from 'react-table'


import axios from 'axios';

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);

import Breadcrumb from '../components/Breadcrumb';

class PageFinancialsInternal extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    }

  }

  componentDidMount(){
    // if have either accessToken of localstorage or props then stay, else leave
    if((localStorage.getItem('accessToken') !== "" && localStorage.getItem('accessToken') !== null) || (this.props.app.accessToken !== "" && this.props.app.accessToken !== null)){
      this.props.appActions.checkNetwork();
    }else{
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div className={cx('page')}>
        <Breadcrumb grandparent="financials" parent="internal" child="" grandchild="" grandparentLink="/financials" parentLink="" childLink="" grandchildLink="" />
        <div className={cx('pageInner')}>
          <div className={cx('table')}>
            <div className={cx('tableHeader')}>
              Financial list
            </div>
            <div className={cx('tableInner')}>
              <ReactTable
                data={this.props.app.transactionList}
                filterable
                columns={[
                  {
                    columns: [
                      {
                        Header: "Transaction Id",
                        accessor: "transactionId",
                        width: 180
                      },
                      {
                        Header: "Transaction Status",
                        accessor: "transactionStatus",
                        width: 180
                      },
                      {
                        Header: "Financial Id",
                        accessor: "transactionHash",
                        width: 180
                      },
                      {
                        Header: "Merchant Id",
                        accessor: "merchantId",
                        width: 180
                      },
                      {
                        Header: "Payment Currency",
                        accessor: "paymentCurrency",
                        maxWidth: 100
                      },
                      {
                        Header: "Payment Dollar Value",
                        accessor: "paymentDollarValue",
                        maxWidth: 100
                      },
                      {
                        Header: "Cryptocurrency Type",
                        accessor: "cryptocurrencyType",
                        maxWidth: 100
                      },
                      {
                        Header: "Cryptocurrency Paid",
                        accessor: "cryptocurrencyPaid",
                        maxWidth: 100
                      },
                      {
                        Header: "Cryptocurrency Price Quoted",
                        accessor: "cryptocurrencyPrice",
                        maxWidth: 100
                      },
                      {
                        Header: "Cryptocurrency Price Settled",
                        accessor: "cryptocurrencyPrice",
                        maxWidth: 100
                      },
                      {
                        Header: "Exchange",
                        accessor: "exchange",
                        maxWidth: 100
                      },
                      {
                        Header: "Payment Type",
                        accessor: "paymentType",
                        maxWidth: 130
                      },
                      {
                        Header: "Created",
                        accessor: "createdAt",
                        maxWidth: 130
                      },
                      {
                        id: "export",
                        accessor: "id",
                        maxWidth: 130,
                        Cell: ({value}) => (<button onClick={() => {this._exportFinancial(value)}}>Export Report</button>)
                      },
                      {
                        id: "delete",
                        accessor: "id",
                        maxWidth: 130,
                        Cell: ({value}) => (<button onClick={() => {this._deleteFinancial(value)}}>Delete</button>)
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
export default connect(mapStateToProps, mapDispatchToProps)(PageFinancialsInternal);
