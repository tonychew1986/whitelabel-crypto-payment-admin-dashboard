import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';

import Toggle from 'react-toggle'
import ReactTable from 'react-table'

import axios from 'axios';
import renderHTML from 'react-render-html';
import escapeHTML from 'escape-html';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);

import TransactionList from '../components/TransactionList';
import Breadcrumb from '../components/Breadcrumb';

import { BarLoader } from 'react-spinners';

import Transition from 'react-transition-group/Transition';

const PopUpAndOut = ({ children, position, ...props }) => (
  <Transition
    {...props}
    timeout={800}
    onEnter={ node => node.classList.add('popUp', 'animate')}
    onExit={node => {
      node.classList.remove('popUp', 'animate');
      node.classList.add('popOut', 'animate');
    }}
  >
    {children}
  </Transition>
);

class PageTransactions extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      filterStatus: "",
      modalIsOpen: false,
      selectedTransactionId: ""
    }

  }

  componentDidMount(){
    // if have either accessToken of localstorage or props then stay, else leave
    if((localStorage.getItem('accessToken') !== "" && localStorage.getItem('accessToken') !== null) || (this.props.app.accessToken !== "" && this.props.app.accessToken !== null)){
      this.props.appActions.checkNetwork();
      this.props.appActions.getTransactionList(this.state.filterStatus);
    }else{
      this.props.history.push('/login');
    }
  }

  _deleteTransaction = () => {
    this._closeModal();
    this.props.appActions.deleteTransaction(this.state.selectedTransactionId);
    this.props.appActions.deleteSettlement(this.state.selectedTransactionId);
    toast.success("Transaction deleted!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      transition: PopUpAndOut,
      closeButton: false,
      hideProgressBar: true,
      bodyClassName: "toast"
    });
  }

  _deleteTransactionModal = (transactionId) => {
    this.setState({
      modalIsOpen: true,
      selectedTransactionId: transactionId
    });
  }

  _checkTransaction = (transactionId) => {
    this.props.appActions.checkTransaction(transactionId);
  }


  _filterStatus = (state) => {
    this.setState({
      filterStatus: state
    })
  }

  _filterList = () => {
    this.props.appActions.getTransactionList(this.state.filterStatus);
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
    if(this.props.app.loading){
      return (
        <div className={cx('page')}>
          <BarLoader
            color={'#123abc'}
            loading={this.state.loading}
          />
        </div>
      )
    }else{
      return (
        <div className={cx('page')}>
          <Breadcrumb grandparent="transactions" parent="" child="" grandchild="" grandparentLink="" parentLink="" childLink="" grandchildLink="" />
          <ToastContainer />
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
                  Are you sure you want to delete this transaction?
                </div>
                <div className={cx('modalContentDescription')}>
                  This transaction is irreversible.
                </div>
                <div className={cx('modalContentActions')}>
                  <div className={cx('modalContentAction')}>
                    <button onClick={() => this._deleteTransaction()}>Yes. Delete it</button>
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
              <div>
                <button onClick={() => this._filterStatus("")}>
                  all
                </button>
              </div>
              <div>
                <button onClick={() => this._filterStatus("pending")}>
                  Pending
                </button>
              </div>
              <div>
                <button onClick={() => this._filterStatus("approved")}>
                  Approved
                </button>
              </div>
              <div>
                <button onClick={() => this._filterList()}>
                  Filter
                </button>
              </div>
            </div>
            <div className={cx('table')}>
              <div className={cx('tableHeader')}>
                Transaction list
              </div>
              <div className={cx('tableInner')}>
                <ReactTable
                  data={this.props.app.transactionList}
                  filterable
                  getTrProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: (e, handleOriginal) => {
                        console.log('A Td Element was clicked!')
                        console.log('it produced this event:', e)
                        console.log('It was in this column:', column)
                        console.log('It was in this row:', rowInfo.original.transactionStatus)
                        console.log('It was in this table instance:', instance)

                        // IMPORTANT! React-Table uses onClick internally to trigger
                        // events like expanding SubComponents and pivots.
                        // By default a custom 'onClick' handler will override this functionality.
                        // If you want to fire the original onClick handler, call the
                        // 'handleOriginal' function.
                        if (handleOriginal) {
                          handleOriginal()
                        }
                      // },
                      // style: {
                      //   background: ((rowInfo.original.transactionStatus == "settled") ? "tableHighlight": "" )
                      }
                    }
                  }}
                  columns={[
                    {
                      columns: [
                        {
                          Header: "Primary Id",
                          accessor: "id",
                          maxWidth: 100
                        },
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
                          Header: "Transaction Hash",
                          accessor: "transactionHash",
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
                          Header: "Cryptocurrency Price",
                          accessor: "cryptocurrencyPrice",
                          maxWidth: 100
                        },
                        {
                          Header: "Receiving Address",
                          accessor: "addressReceiver",
                          maxWidth: 100
                        },
                        {
                          Header: "Sending Address",
                          accessor: "addressSender",
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
                          maxWidth: 130
                        },
                        {
                          Header: "Product Reference Code",
                          accessor: "productReference",
                          maxWidth: 130
                        },
                        {
                          Header: "Shipping Name",
                          accessor: "shippingName",
                          maxWidth: 130
                        },
                        {
                          Header: "Shipping Email",
                          accessor: "shippingEmail",
                          maxWidth: 130
                        },
                        {
                          Header: "Shipping Mobile",
                          accessor: "shippingMobile",
                          maxWidth: 130
                        },
                        {
                          Header: "Shipping Country",
                          accessor: "shippingCountry",
                          maxWidth: 130
                        },
                        {
                          Header: "Shipping Address",
                          accessor: "shippingAddress",
                          maxWidth: 130
                        },
                        {
                          Header: "Shipping Postal",
                          accessor: "shippingPostal",
                          maxWidth: 130
                        },
                        {
                          Header: "Created",
                          accessor: "createdAt",
                          maxWidth: 130
                        },
                        {
                          id: "check",
                          accessor: "id",
                          width: 230,
                          Cell: ({value}) => (<button onClick={() => {this._checkTransaction(value)}}>Check Transaction</button>)
                        },
                        {
                          id: "delete",
                          accessor: "transactionId",
                          maxWidth: 130,
                          Cell: ({value}) => (<button onClick={() => {this._deleteTransactionModal(value)}}>Delete</button>)
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
export default connect(mapStateToProps, mapDispatchToProps)(PageTransactions);
