import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';

import Toggle from 'react-toggle'
import ReactTable from 'react-table'
import Modal from 'react-modal';


import axios from 'axios';

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);

import Breadcrumb from '../components/Breadcrumb';

class PageSettlements extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    modalIsOpen: false,
    selectedTransactionId: ""
    }

  }

  componentDidMount(){
    // if have either accessToken of localstorage or props then stay, else leave
    if((localStorage.getItem('accessToken') !== "" && localStorage.getItem('accessToken') !== null) || (this.props.app.accessToken !== "" && this.props.app.accessToken !== null)){
      this.props.appActions.checkNetwork();
      this.props.appActions.getSettlementList();
    }else{
      this.props.history.push('/login');
    }
  }

  _deleteSettlement = () => {
    this._closeModal();
    this.props.appActions.deleteTransaction(this.state.selectedTransactionId);
    this.props.appActions.deleteSettlement(this.state.selectedTransactionId);
  }

  _deleteSettlementModal = (transactionId) => {
    this.setState({
      modalIsOpen: true,
      selectedTransactionId: transactionId
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
        <Breadcrumb grandparent="settlements" parent="" child="" grandchild="" grandparentLink="" parentLink="" childLink="" grandchildLink="" />
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
                Are you sure you want to delete this settlement?
              </div>
              <div className={cx('modalContentDescription')}>
                This transaction is irreversible.
              </div>
              <div className={cx('modalContentActions')}>
                <div className={cx('modalContentAction')}>
                  <button onClick={() => this._deleteSettlement()}>Yes. Delete it</button>
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
              Settlements list
            </div>
            <div className={cx('tableInner')}>
              <ReactTable
                data={this.props.app.settlementList}
                filterable
                columns={[
                  {
                    columns: [
                      {
                        Header: "Invoice Id",
                        accessor: "invoiceId",
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
                        accessor: "paymentAmount",
                        maxWidth: 100
                      },
                      {
                        Header: "Paid Amount to Merchant",
                        accessor: "paymentAmountReleased",
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
                        accessor: "cryptocurrencyPriceQuoted",
                        maxWidth: 100
                      },
                      {
                        Header: "Cryptocurrency Price Settled",
                        accessor: "cryptocurrencyPriceSettled",
                        maxWidth: 100
                      },
                      {
                        Header: "Exchange",
                        accessor: "exchangeSettled",
                        maxWidth: 100
                      },
                      {
                        Header: "Network",
                        accessor: "network",
                        maxWidth: 100
                      },
                      {
                        Header: "Sold Amount",
                        accessor: "exchangeSettled",
                        maxWidth: 100,
                        Cell: row => {
                            return <span>{((row.original.cryptocurrencyPaid * row.original.cryptocurrencyPriceSettled)).toFixed(3)}</span>
                        }
                      },
                      {
                        Header: "Fees",
                        accessor: "exchangeSettled",
                        maxWidth: 100,
                        Cell: row => {
                            return <span>{((row.original.paymentAmount)-row.original.paymentAmountReleased).toFixed(3)}</span>
                        }
                      },
                      {
                        Header: "Total Profit",
                        accessor: "exchangeSettled",
                        maxWidth: 100,
                        Cell: row => {
                            return <span>{(((row.original.cryptocurrencyPaid * row.original.cryptocurrencyPriceSettled)+(row.original.paymentAmount-row.original.paymentAmountReleased))-row.original.paymentAmount).toFixed(3)}</span>
                        }
                      },
                      {
                        Header: "Total Profit Percentage",
                        accessor: "exchangeSettled",
                        maxWidth: 100,
                        Cell: row => {
                            return <span>{(((((row.original.cryptocurrencyPaid * row.original.cryptocurrencyPriceSettled)+(row.original.paymentAmount-row.original.paymentAmountReleased))-row.original.paymentAmountReleased)/row.original.paymentAmount)*100).toFixed(3)}</span>
                        }
                      },
                      {
                        Header: "Created",
                        accessor: "createdAt",
                        maxWidth: 130
                      },
                      {
                        id: "delete",
                        accessor: "transactionId",
                        maxWidth: 130,
                        Cell: ({value}) => (<button onClick={() => {this._deleteSettlementModal(value)}}>Delete</button>)
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
export default connect(mapStateToProps, mapDispatchToProps)(PageSettlements);
