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

class PageFinancials extends Component {

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
        <Breadcrumb grandparent="financials" parent="" child="" grandchild="" grandparentLink="" parentLink="" childLink="" grandchildLink="" />
        <div className={cx('pageInner')}>
          <div className={cx('financialSelection')}>
            <Link to="/financials/internal">
              <div className={cx('financialSelectionEntry')}>
                <div className={cx('financialSelectionEntryIcon')}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJCSURBVHhe7dAxihxBEEXBuf+lJSf0DIlE20kbNVDh7SP7U7Of67qu65r9+nJ+xp6dr+Vn7Nn5Wn7Gnp2v5Wfs2Yl8LM+MvGcn8rE8M/KencjH8szIe3YiH8szI+/ZiRx55CzyyFnkkbPIkffsRI48chZ55CzyyFnkyHt2IkceOYs8chZ55Cxy5D07kSOPnEUeOYs8chY58p6dyMfyzMh7diIfyzMj79mJfCzPjLxnJ/KxPDPynp3IkUfOIo+cRR45ixx5z07kyCNnkUfOIo+cRY68Zydy5JGzyCNnkUfOIkfesxM58shZ5JGzyCNnkSPv2Yl8LM+MvGcn8rE8M/KencjH8szIe3YiH8szI+/ZiRx55CzyyFnkkbPIkffsRI48chZ55CzyyFnkyHt2IkceOYs8chZ55Cxy5D07kSOPnEUeOYs8chY58p6dyMfyzMh7diIfyzMj79mJfCzPjLxnJ/KxPDPynp3IkUfOIo+cRR45ixx5z07kyCNnkUfOIo+cRY68Zydy5JGzyCNnkUfOIkfesxM58shZ5JGzyCNnkSPv2Yl8LM+MvGcn8rE8M/KencjH8szIe3YiH8szI+/ZiRx55Oy/d3/z2Y/3/5Aj79mJHHnk7P4D/PljPrv/AH+OnEWOvGcn8mM+jxw58mM+j7xnJ/JjPo8cOfJjPo+8ZyfyYz6PHDnyYz6PvGcn8mM+jxw58mM+j7xn53XmI7/O/J6d15mP/Drze3ZeZz7y68zv2Xmd+civM39d13Vd//h8fgPyL22e+JTQuQAAAABJRU5ErkJggg==" />
                </div>
                <div className={cx('financialSelectionEntryText')}>
                  Internal Financials
                </div>
              </div>
            </Link>
            <Link to="/financials/merchant">
              <div className={cx('financialSelectionEntry')}>
                <div className={cx('financialSelectionEntryIcon')}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOVSURBVHhe7dhBThRBHEZxEiIb9wTRPafgGJxBjfEWeggTL6GewIUShSt4BDbERDaOftXzeChjC9NMVc9o/5KOzuue+leP2ghbk8lkMplMRjGbze6Xg5f/j9z0bo4XOc44yu93Of3vyk0e5HiV49uPa0rj3AGX/ztyU4c53uT4zv32Ktdw7SFv30y5l+0cR7mRT92dDcB7j3Jss+z6y6bLg+15ji/dXfQo57lumWvX94GZfe5lgy9znM23/Wc5v/CnWn5fGud6lbXLjPx2j7eOLxu6fLBdzLe5KOdu/e+6XMO1vc+LnLvIMe4DM8Nvs9HBT/byHt678BXjUs61fWBmZvO/qmWNslZZs1u8B3uq88DM4ss+2Fb+sCprsnbbPWShcT/9a8qMMouZvcqey95523CstyCLj/4fljKbPfQ+h7h0ONZRhpUn8Osca/Nf1rIX9rTwlYhLhmOdX63P1+Bryt7mW7zCqeFYZ2NxG8OxzsbiNoZjnY3FbQzHOhuL21g91hdZZJFFFllkkUUWuR3miiyyyCKLLLLIIovcDnNFFllkkUUWWWSRRW6HuSKLLLLIIossssgit8NckUUWWWSRRRZZZJHbYa7IIossssgiiyyyyO0wV2SRRRZZZJFFFlnkdpgrssgiiyyyyCKLLHI7zBVZZJFFFllkkUUWuR3miiyyyCKLLLLIIovcDnNFFllkkUUWWWSRRW6HuSKLLLLIIossssgit8NckUUWWWSRRRZZZJHbYa7IIossssgiiyyyyO0wV2SRRRZZs9nsfY6vvFy5snaO4xzP8nKHbQw3X/YKWWSRRR7LaT6IfbYyDAuJLLLIIo8mH8BJfrnHdpY3X+YKWWSRRR5VPoSnbGd5rCGyyCKLrGzm7Z3/Wv5FWbvMYFwnrz9yenmsIbLIIousbOYhp6rJjEeM6+T1OaeWxxoiiyyyyCJXxziRl8f7RRZZZJFFro5xIt+M66thTPU51zH2ZlxfDWOmD4CXzTD2ZlxfDWPW7wPguuoYVx3jRO7HddUxrjrGidyP66pjXHWME7kf11XHuOoYJ3J7zBe5OsaJ3B7zRa6OcSK3l29Efvvpz8Z9M3RXGX7MPjp5Xb4drvYhlLVzvGNcJ6+Hfzt8VxlefjY3quzhCdtpL/N3cpx2OxlBbv5zfhn+I7FVyCb2s4nmH0LmnuR4wDbGlf3slL+KOT7kOJ9vcfXK2sx4nJf8yW9t/QSM35LEEYTXlgAAAABJRU5ErkJggg==" />
                </div>
                <div className={cx('financialSelectionEntryText')}>
                  Merchants' Financials
                </div>
              </div>
            </Link>
            <Link to="/financials/consumer">
              <div className={cx('financialSelectionEntry')}>
                <div className={cx('financialSelectionEntryIcon')}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASHSURBVHhe7ZrNbxVVGMZLqwkohgUB2rjQoljCQqDRaBMVxIgJO4FF2w0sXJAa+XJj3djUtMb4P2hcaFvwL1BDIfErMZq4ACR8NOEjMbCpH1hI5Jbfe87TkZnbW+5HZ3ouOb/kycx73nPe95nbe+fOzG1LJBKJRCKRSCSSP6VSqRsNo0l0Fv0j2f7k7OzsENtuTX8w4KCWcVB70Dn2q8LmojfZXaYyzQkH0Yl+8IdVO1r7pMo1F5h/Bd3wh1I/1LiOXlbZ5gDD29BtHUOCjaEx1Iu60KOS7dvYBKq0rjleBPyux+x1bz3FMXTftzNrOzU3hdVET2hamODTTnipzzzxf+iQplQNa47YWpVxEH+ndJhgcK+8JtRz8HPYi6AyCYztVjos8GZ//d+9TQ/xuNJ1Q5nUx4GaZ5QKC4x1y6OD+Babhr/CqGHnlOyJcYvS4YDJYZlzEI8p1TDUmlBZB/EHSoUDpk7In4O4V6mGoVa/yjqIv1UqHDCVutQlfkaphrFaKuuwXkqFA6b+kj8H8WNKNYzVUlmH9VIqHDA1I3+OnF+AGaXCAVN/yJ+DOM+PwDWlwgFTdj+fQNynVMNQK3sSPKFUOGDqE/lzEDd8ETQH5bIXQx8rFQ74esnb82DS7uA6la4bajxltVTWQdyjdDjgqxVj2UvhCaXrhhpfqZyD+DSbMJ8UYWy/c3kPGD6sdM2w9qjKJDC2T+nwwJ+9C370Vj3Edjt8RFOqhjXv2lqVcRB/z6ZVU8IEk12YnHaO09iJbL2mVYT1T6PjfkmKacY3aFrYYPQNZHeDKRizE6M99uoj3MjWPRLTfr9y8z0Su4VeV/nmAMP2IvypY6gbq4F2qmxzgfEeVPYXrRZbi15UueYB76uQ/cqzKO8ANkNolcqHDYZ3oCvO/SJiNdGrahMeeLRngqPojrc8LyfJD6Dn0ONohWT7NjZgc/zUcsjfQSPshnUhhKE2jH3uXC4Acya1pCLMOaXpFWHOZ2zatGRpwUgrmu+HDDuBfakwgbERLS2D3EealsDYF1ZLYQJj42yW/p2ACTtBpcDcRTZbkH0sfnaD98DY12gnWi3Z/jdKJzD2ExursRVN+dH/YWxpH45iYBcqyY+D8DfUoSk2ZxNKPS6rErua3KgyVqfDavuUh9jYpSnFQv+VNL/qrXiIp9AaTUkgtZ3xWr4S7bJ3m5YnMLYWpb5hiM3DSk0pDhqPegse4hn0rNJlkLNfgKs5wdl/j3RpWRnkNqPUZTbxh0oXAz3baZp9CDqodEWYZp/n19Cn6Dy6Kdl/hNjYDk1dEOa977t6iO3FX6d0/tBsUL0dxJfYPKR07tDrYXpmT4rvKZ0vNLJ7fjvLJxC/pXRh0POA2juIL7DJ/2uRRtkfQf9m84jShUFfu5W+6V14zJvS+UGTg+rnIF60H0Frhd7ZH03fUSo/6JN9RH1AqcKh99uy4Sjkj0GTX9XPQfy8UoVD7xdkw0H8i1L5QZPUxQ+0K1U4eOmQBwfxZaXygyb/qt8cy5UqHOvtLXjMm1KRSCQSiUQikciCtLTcBXFPSxt2hQVgAAAAAElFTkSuQmCC" />
                </div>
                <div className={cx('financialSelectionEntryText')}>
                  Consumers' Financials
                </div>
              </div>
            </Link>
            <div className={cx('clear')}></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PageFinancials);
