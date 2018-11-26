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

class PageInvoices extends Component {

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
      this.props.appActions.getInvoiceList();
    }else{
      this.props.history.push('/login');
    }
  }

  _deleteInvoice = () => {
    this._closeModal();
    this.props.appActions.deleteInvoice(this.state.selectedTransactionId);
    this.props.appActions.deleteSettlement(this.state.selectedTransactionId);
  }

  _deleteInvoiceModal = (invoiceId) => {
    this.setState({
      modalIsOpen: true,
      selectedTransactionId: invoiceId
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
        <Breadcrumb grandparent="invoices" parent="" child="" grandchild="" grandparentLink="" parentLink="" childLink="" grandchildLink="" />
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
                Are you sure you want to delete this invoice?
              </div>
              <div className={cx('modalContentDescription')}>
                This transaction is irreversible.
              </div>
              <div className={cx('modalContentActions')}>
                <div className={cx('modalContentAction')}>
                  <button onClick={() => this._deleteInvoice()}>Yes. Delete it</button>
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
          <div>
            Invoice Generated past 24 hours
          </div>
          <div>
            {this.props.app.invoiceCountDay}
          </div>
          <div>
            Invoice Generated past 7 days
          </div>
          <div>
            {this.props.app.invoiceCountWeek}
          </div>
          <div>
            Invoice Generated past 30 days
          </div>
          <div>
            {this.props.app.invoiceCountMonth}
          </div>
          <div>
            Payment Volume past 24 hours
          </div>
          <div>
            {this.props.app.invoiceVolumeDay}
          </div>
          <div>
            Payment Volume past 7 days
          </div>
          <div>
            {this.props.app.invoiceVolumeWeek}
          </div>
          <div>
            Payment Volume past 30 days
          </div>
          <div>
            {this.props.app.invoiceVolumeMonth}
          </div>
          <div>
            Invoice type: pending, detected, settled
          </div>
          <div>
            Cryptocurrency type: btc, eth, ltc
          </div>
          <div>
            Currency type: usd, sgd
          </div>
          <div>
            Payment type: external, internal
          </div>
          <div className={cx('table')}>
            <div className={cx('tableHeader')}>
              Invoice list
            </div>
            <div className={cx('tableInner')}>
              <ReactTable
                data={this.props.app.invoiceList}
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
                        Header: "Merchant Name",
                        accessor: "merchantName",
                        width: 180
                      },
                      {
                        Header: "Payment Currency",
                        accessor: "currency",
                        maxWidth: 100
                      },
                      {
                        Header: "Payment Amount",
                        accessor: "amount",
                        maxWidth: 100
                      },
                      {
                        Header: "status",
                        accessor: "status",
                        maxWidth: 100
                      },
                      {
                        Header: "Product Code",
                        accessor: "productReference",
                        maxWidth: 100
                      },
                      {
                        Header: "Cryptocurrency",
                        accessor: "paidCryptocurrency",
                        maxWidth: 100
                      },
                      {
                        Header: "Blockchain Hash",
                        accessor: "blockchainHash",
                        maxWidth: 100
                      },
                      {
                        Header: "Address",
                        accessor: "cryptoAddress",
                        maxWidth: 100
                      },
                      {
                        Header: "Platform",
                        accessor: "platform",
                        maxWidth: 100
                      },
                      {
                        Header: "Network",
                        accessor: "network",
                        maxWidth: 100
                      },
                      {
                        Header: "Payment Type",
                        accessor: "paymentType",
                        maxWidth: 100
                      },
                      {
                        Header: "Cryptocurrency Price",
                        accessor: "priceBTC",
                        maxWidth: 130,
                        Cell: row => {
                            return (
                              <span>
                                {((row.original.paidCryptocurrency == "btc" || row.original.paidCryptocurrency == "BTC") ? row.original.priceBTC : "")}
                                {((row.original.paidCryptocurrency == "eth" || row.original.paidCryptocurrency == "ETH") ? row.original.priceETH : "")}
                                {((row.original.paidCryptocurrency == "ltc" || row.original.paidCryptocurrency == "LTC") ? row.original.priceLTC : "")}
                              </span>
                            )
                        }
                      },
                      {
                        Header: "Cryptocurrency Amount",
                        accessor: "amountBTC",
                        maxWidth: 130,
                        Cell: row => {
                            return (
                              <span>
                                {((row.original.paidCryptocurrency == "btc" || row.original.paidCryptocurrency == "BTC") ? row.original.amountBTC : "")}
                                {((row.original.paidCryptocurrency == "eth" || row.original.paidCryptocurrency == "ETH") ? row.original.amountETH : "")}
                                {((row.original.paidCryptocurrency == "ltc" || row.original.paidCryptocurrency == "LTC") ? row.original.amountLTC : "")}
                              </span>
                            )
                        }
                      },
                      {
                        id: "delete",
                        accessor: "invoiceId",
                        maxWidth: 130,
                        Cell: ({value}) => (<button onClick={() => {this._deleteInvoiceModal(value)}}>Delete</button>)
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
export default connect(mapStateToProps, mapDispatchToProps)(PageInvoices);
