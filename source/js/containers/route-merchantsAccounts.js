import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';

import Toggle from 'react-toggle'
import ReactTable from 'react-table'
import Modal from 'react-modal';

import MerchantAccountList from '../components/MerchantAccountList';
import { BarLoader } from 'react-spinners';

import axios from 'axios';

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);

import Breadcrumb from '../components/Breadcrumb';

class PageMerchantsAccounts extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      modalIsOpen: false,
      selectedMerchantId: ""
    }

  }

  componentDidMount(){
    // if have either accessToken of localstorage or props then stay, else leave
    if((localStorage.getItem('accessToken') !== "" && localStorage.getItem('accessToken') !== null) || (this.props.app.accessToken !== "" && this.props.app.accessToken !== null)){
      this.props.appActions.checkNetwork();
      this.props.appActions.getMerchantAccountList();
    }else{
      this.props.history.push('/login');
    }
  }

  _deleteMerchantAccountModal = (accountId) => {
    this.setState({
      modalIsOpen: true,
      selectedMerchantId: accountId
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

  _deleteMerchantAccount = () => {
    this._closeModal();
    this.props.appActions.deleteMerchantAccount(this.state.selectedMerchantId);
    this.props.appActions.deleteFinancialAccount(this.state.selectedMerchantId);
  }

  _editMerchantAccount = (accountId) => {
    this.props.history.push('/merchants/edit/account/'+accountId);
    //this.props.appActions.editMerchantAccount(accountId);
  }

  _viewMerchantAccount = (accountId) => {
    this.props.history.push('/merchants/view/account/'+accountId);
    //this.props.appActions.editMerchantAccount(accountId);
  }

  _generateAddress = (accountId) => {
    this.props.appActions.generateAddress(accountId);
  }

  render() {
    // if(this.props.app.loading){
    //   return (
    //     <div className={cx('page')}>
    //       <BarLoader
    //         color={'#123abc'}
    //         loading={this.state.loading}
    //       />
    //     </div>
    //   )
    // }else{
      return (
        <div className={cx('page')}>
          <Breadcrumb grandparent="merchants" parent="accounts" child="" grandchild="" grandparentLink="/merchants" parentLink="" childLink="" grandchildLink="" />
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
                  Are you sure you want to delete this merchant?
                </div>
                <div className={cx('modalContentDescription')}>
                  This transaction is irreversible.
                </div>
                <div className={cx('modalContentActions')}>
                  <div className={cx('modalContentAction')}>
                    <button onClick={() => this._deleteMerchantAccount()}>Yes. Delete it</button>
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
                Merchant Accounts
              </div>
              <div className={cx('tableInner')}>
                <ReactTable
                  data={this.props.app.merchantAccountList}
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
                          Header: "Merchant Id",
                          accessor: "merchantId",
                          width: 180
                        },
                        {
                          Header: "Name",
                          accessor: "name",
                          width: 180
                        },
                        {
                          Header: "Owner Id",
                          accessor: "ownerId",
                          maxWidth: 100
                        },
                        {
                          Header: "Owner Name",
                          accessor: "ownerName",
                          maxWidth: 100
                        },
                        {
                          Header: "BTC",
                          accessor: "addressBTC",
                          maxWidth: 100
                        },
                        {
                          Header: "ETH",
                          accessor: "addressETH",
                          maxWidth: 100
                        },
                        {
                          Header: "LTC",
                          accessor: "addressLTC",
                          maxWidth: 100
                        },
                        {
                          Header: "BTC-TESTNET",
                          accessor: "addressTestnetBTC",
                          maxWidth: 100
                        },
                        {
                          Header: "ETH-TESTNET",
                          accessor: "addressTestnetETH",
                          maxWidth: 100
                        },
                        {
                          Header: "LTC-TESTNET",
                          accessor: "addressTestnetLTC",
                          maxWidth: 100
                        },
                        {
                          Header: "Wallet Set",
                          accessor: "walletSet",
                          maxWidth: 100
                        },
                        {
                          Header: "Wallet Key Num",
                          accessor: "walletKeyNum",
                          maxWidth: 100
                        },
                        {
                          Header: "Address",
                          accessor: "address",
                          maxWidth: 130
                        },
                        {
                          Header: "Mobile",
                          accessor: "mobile",
                          maxWidth: 130
                        },
                        {
                          Header: "Country",
                          accessor: "country",
                          maxWidth: 130
                        },
                        {
                          Header: "Account Tier",
                          accessor: "accountTier",
                          maxWidth: 130
                        },
                        {
                          Header: "Account Status",
                          accessor: "accountStatus",
                          maxWidth: 130
                        },
                        {
                          id: "view",
                          accessor: "merchantId",
                          width: 160,
                          Cell: ({value}) => (<button name="viewAccount" onClick={() => {this._viewMerchantAccount(value)}}>View Account</button>)
                        },
                        {
                          id: "generate",
                          accessor: "merchantId",
                          width: 160,
                          Cell: ({value}) => (<button onClick={() => {this._generateAddress(value)}}>Generate Address</button>)
                        },
                        {
                          id: "edit",
                          accessor: "merchantId",
                          maxWidth: 130,
                          Cell: ({value}) => (<button onClick={() => {this._editMerchantAccount(value)}}>Edit</button>)
                        },
                        {
                          id: "delete",
                          accessor: "merchantId",
                          maxWidth: 130,
                          Cell: ({value}) => (<button onClick={() => {this._deleteMerchantAccountModal(value)}}>Delete</button>)
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
    //}
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
export default connect(mapStateToProps, mapDispatchToProps)(PageMerchantsAccounts);
