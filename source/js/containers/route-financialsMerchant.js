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

class PageFinancialsMerchant extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    }

  }

  componentDidMount(){
    // if have either accessToken of localstorage or props then stay, else leave
    if((localStorage.getItem('accessToken') !== "" && localStorage.getItem('accessToken') !== null) || (this.props.app.accessToken !== "" && this.props.app.accessToken !== null)){
      this.props.appActions.checkNetwork();
      this.props.appActions.getFinancialsList("merchant");
    }else{
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div className={cx('page')}>
        <Breadcrumb grandparent="financials" parent="merchant" child="" grandchild="" grandparentLink="/financials" parentLink="" childLink="" grandchildLink="" />
        <div className={cx('pageInner')}>
          <div className={cx('table')}>
            <div className={cx('tableHeader')}>
              Financial list
            </div>
            <div className={cx('tableInner')}>
              <ReactTable
                data={this.props.app.financialMerchantList}
                filterable
                columns={[
                  {
                    columns: [
                      {
                        Header: "Account Type",
                        accessor: "accountType",
                        width: 180
                      },
                      {
                        Header: "Merchant Id",
                        accessor: "accountId",
                        width: 180
                      },
                      {
                        Header: "Merchant Name",
                        accessor: "accountName",
                        width: 180
                      },
                      {
                        Header: "Balance BTC",
                        accessor: "balanceBTC",
                        maxWidth: 100
                      },
                      {
                        Header: "Balance ETH",
                        accessor: "balanceETH",
                        maxWidth: 100
                      },
                      {
                        Header: "Balance LTC",
                        accessor: "balanceLTC",
                        maxWidth: 100
                      },
                      {
                        Header: "Balance USD",
                        accessor: "balanceUSD",
                        maxWidth: 100
                      },
                      {
                        Header: "Balance SGD",
                        accessor: "balanceSGD",
                        maxWidth: 100
                      },
                      {
                        Header: "Balance Testnet BTC",
                        accessor: "balanceTestnetBTC",
                        maxWidth: 100
                      },
                      {
                        Header: "Balance Testnet ETH",
                        accessor: "balanceTestnetETH",
                        maxWidth: 100
                      },
                      {
                        Header: "Balance Testnet LTC",
                        accessor: "balanceTestnetLTC",
                        maxWidth: 100
                      },
                      {
                        Header: "Balance Testnet USD",
                        accessor: "balanceTestnetUSD",
                        maxWidth: 100
                      },
                      {
                        Header: "Balance Testnet SGD",
                        accessor: "balanceTestnetSGD",
                        maxWidth: 100
                      },
                      {
                        id: "export",
                        accessor: "merchantId",
                        maxWidth: 130,
                        Cell: ({value}) => (<button onClick={() => {this._exportFinancial(value)}}>Export Report</button>)
                      },
                      {
                        id: "export",
                        accessor: "merchantId",
                        maxWidth: 180,
                        Cell: ({value}) => (<button onClick={() => {this._viewFinancialDetail(value)}}>View Financial Detail</button>)
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
export default connect(mapStateToProps, mapDispatchToProps)(PageFinancialsMerchant);
