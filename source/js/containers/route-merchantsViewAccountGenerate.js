import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';
import * as pageActions from '../actions/home';

import axios from 'axios';
import renderHTML from 'react-render-html';
import escapeHTML from 'escape-html';
import Toggle from 'react-toggle'

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);


import Breadcrumb from '../components/Breadcrumb';
import MerchantProfile from '../components/MerchantProfile';
////

var infoIcon = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIrSURBVFhH7Zc5TgNBFEQtsSSILQWRsYVs50CGq7AdgCVEbCEIroENHIMlhRgCxBJheGVVS4ih2zPGCJB4Uqlnftevscdjd7v0z5+iVquNoRV0gi7Qg6XjKlpGo7a3DkJn0NlrTvDqBU66vXnI6iBoD9UcfIf20SzS3eiyxpguMx6gO3vFLoftjisGjf0E1N814yNaQz2ejoK9195n956q5ul80NDpRgVco8K3k54pdOMMZbV5qjE07LjxBg24XBh6B5XhrG2X02DUAyee0JcfJK497Swx5XIcTOHWr7oURT7h0yhkrcvHWHXpc/CM23iL8jxwdXwaBYsezFt5GUdczsLksk37LrUMMg+dvehSFiarMkHZpZZB9ryCGSsuZWHyyqZcP6fyCp8mUaa8jJcuZWHy3qZul5LIK3yaRJny6houZfkNL+DHP4L6Q8g451ISeYVPk5AZHsJjl7IwuWTTgUtJ5BU+TYLtSF6yF1zKwqSWVZm+84do2OXPwXBi47pLUeQTPo1C1oZ8jPHfgAA+LR7iSccuNw05Wty0GL2QN+FyGszvl+NBlwtD75AynLXlcmPwt9MQVkW9iMbL6Afo0TsPF9e3K/+GRNCgByd8LXUL1zjs83QUefBuoLAlqzAU25IFaNSd2EX6/BSmTalWtTIa57i+KfXxnOZQ2JS+oE0Om9uUvoegSRRWyobgPVaP21sHoSNoCVVQ+GNyj86RLrqI4huOf34fpdIbVIukIBI07SUAAAAASUVORK5CYII=" />

class PageMerchantsViewAccountGenerate extends Component {

  constructor(props, context) {
    super(props, context);

      this.state = {
        generatedPayLinkStatus: false,
        shippingEnabled: false,
        paymentAmount: "",
        fiatCurrency: "sgd",
        productReference: "",
        generatedCode: '<div>Pay</div>',
      }
  }

  componentDidMount(){
    this.props.appActions.getMerchantAccountDetail(this.props.match.params.id);
  }

  _generateCryptoPayLink = () => {
    var paymentLink;
    if(this.props.app.network == "staging"){
      paymentLink = "https://crypto-pay-dashboard-stag.herokuapp.com";
    }else if(this.props.app.network == "production"){
      paymentLink = "https://crypto-pay-dashboard-prod.herokuapp.com";
    }else{
      paymentLink = "http://localhost:3001";
    }
    this.setState({
      generatedPayLinkStatus: true,
      generatedCode: '<div><a href="'+paymentLink+'/#/review/'+this.props.app.currentAccount.merchantId+'/'+ this.state.fiatCurrency +'/'+ this.state.paymentAmount +'/'+ this.state.productReference +'/'+ ((this.state.shippingEnabled == true) ? "1" : "0" ) +'" target="_blank"><button>Pay with CryptoPay</button></a></div>'
    })
  }

  _paymentAmountChange = (e) => {
    this.setState({paymentAmount: e.target.value});
  }

  _productReferenceChange = (e) => {
    this.setState({productReference: e.target.value});
  }

  _shippingEnabledChange = () => {
    this.setState({shippingEnabled: !this.state.shippingEnabled});
  }

  _backToForm = () => {
    this.setState({
      generatedPayLinkStatus: false
    })
  }

  render() {
    var accountLink = "/merchants/view/account/" + this.props.app.currentAccount.merchantId;

    return (
      <div className={cx('page')}>
        <Breadcrumb grandparent="merchants" parent="accounts" child="profile" grandchild="generate payment button" grandparentLink="/merchants" parentLink="/merchants/accounts" childLink={accountLink} grandchildLink="" />
        <div className={cx('pageInner')}>
          <div className={cx('merchantView')}>
            <MerchantProfile accountTier={this.props.app.currentAccount.accountTier} name={this.props.app.currentAccount.name} merchantId={this.props.app.currentAccount.merchantId} createdAt={this.props.app.currentAccount.createdAt} country={this.props.app.currentAccount.country} address={this.props.app.currentAccount.address} mobile={this.props.app.currentAccount.mobile} ownerName={this.props.app.currentAccount.ownerName} ownerId={this.props.app.currentAccount.ownerId} />
            <div className={cx('merchantViewContent')}>
              <div className={cx('merchantViewContentTitle')}>
                Generate Payment Button
              </div>
              <div className={cx(((this.state.generatedPayLinkStatus == false) ? '' : 'hide' ))}>
                <div className={cx('merchantViewContentSection')}>
                  <div>
                    Select Payment Integration Method:
                  </div>
                  <div className={cx('merchantViewContentSectionPaymentType')}>
                    <div className={cx('merchantViewContentSectionPaymentTypeAction', 'merchantViewContentSectionPaymentTypeActionSelected')}>
                      <div className={cx('merchantViewContentSectionPaymentTypeActionText')}>
                        Simple
                      </div>
                      <div className={cx('merchantViewContentSectionPaymentTypeActionIcon')}>
                        {infoIcon}
                      </div>
                      <div className={cx('clear')}></div>
                    </div>
                    <div className={cx('merchantViewContentSectionPaymentTypeAction')}>
                      <div className={cx('merchantViewContentSectionPaymentTypeActionText')}>
                        Standard
                      </div>
                      <div className={cx('merchantViewContentSectionPaymentTypeActionIcon')}>
                        {infoIcon}
                      </div>
                      <div className={cx('clear')}></div>
                    </div>
                    <div className={cx('merchantViewContentSectionPaymentTypeAction')}>
                      <div className={cx('merchantViewContentSectionPaymentTypeActionText')}>
                        Advanced
                      </div>
                      <div className={cx('merchantViewContentSectionPaymentTypeActionIcon')}>
                        {infoIcon}
                      </div>
                      <div className={cx('clear')}></div>
                    </div>
                    <div className={cx('clear')}></div>
                  </div>
                </div>
                <div className={cx('merchantViewContentSection')}>
                  <div className={cx('merchantViewContentSectionGenerated')}>
                    <div className={cx('merchantViewContentSectionGeneratedEntry')}>
                      <div className={cx('merchantViewContentSectionGeneratedEntryTitle')}>
                        Payment Amount:
                      </div>
                      <div>
                        <input type="text" name="paymentAmount" value={this.state.paymentAmount} onChange={this._paymentAmountChange} required />
                      </div>
                    </div>
                    <div className={cx('merchantViewContentSectionGeneratedEntry')}>
                      <div className={cx('merchantViewContentSectionGeneratedEntryTitle')}>
                        Fiat Currency:
                      </div>
                      <div>
                        <input type="text" name="fiatCurrency" value={this.state.fiatCurrency} onChange={this._fiatCurrencyChange} required />
                      </div>
                    </div>
                    <div className={cx('merchantViewContentSectionGeneratedEntry')}>
                      <div className={cx('merchantViewContentSectionGeneratedEntryTitle')}>
                        Product Reference:
                      </div>
                      <div>
                        <input type="text" name="productReference" value={this.state.productReference} onChange={this._productReferenceChange} required />
                      </div>
                    </div>
                    <div className={cx('merchantViewContentSectionGeneratedEntry')}>
                      <div className={cx('merchantViewContentSectionGeneratedEntryTitle')}>
                        <div className={cx('merchantViewContentSectionGeneratedEntryToggleSwitch')}>
                          <Toggle
                            defaultChecked={this.state.shippingEnabled}
                            aria-label='No label tag'
                            onChange={this._shippingEnabledChange} />
                        </div>
                        <div className={cx('merchantViewContentSectionGeneratedEntryToggleText')}>
                          Show Shipping Details
                        </div>
                        <div className={cx('clear')}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('merchantViewContentSection')}>
                  <div>
                    <button name="generatePay" onClick={() => this._generateCryptoPayLink()}>
                      Generate Payment Button
                    </button>
                  </div>
                </div>
              </div>
              <div className={cx(((this.state.generatedPayLinkStatus == true) ? '' : 'hide' ))}>
                <div className={cx('merchantViewContentSection')}>
                  <div className={cx('merchantViewContentSectionGenerated')}>
                    <div className={cx('merchantViewContentSectionGeneratedEntry')}>
                      <div className={cx('merchantViewContentSectionGeneratedEntryTitle')}>
                        Code Example:
                      </div>
                      <div className={cx('code')}>
                          {renderHTML(escapeHTML(this.state.generatedCode))}
                      </div>
                    </div>
                    <div className={cx('merchantViewContentSectionGeneratedEntry')}>
                      <div className={cx('merchantViewContentSectionGeneratedEntryTitle')}>
                        Example of Button:
                      </div>
                      <div id="sampleButton">
                        {renderHTML((this.state.generatedCode))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('merchantViewContentSection')}>
                  <div>
                    <button className={cx('negative')} onClick={() => this._backToForm()}>
                      Back to generation form
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('clear')}></div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
    return {
        app: state.app,
        page: state.home
    };
}
function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageMerchantsViewAccountGenerate);
