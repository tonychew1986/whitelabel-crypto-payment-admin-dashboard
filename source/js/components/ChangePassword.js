import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class ChangePassword extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      panelState: false
    }
  }
  componentDidMount(){

  }

  _togglePanel = () => {
    this.setState({
      panelState: !this.state.panelState
    })
  }

  render() {
    return (
      <div className={cx('changePassword')}>
        <div className={cx('changePasswordHeader')}>
          <div className={cx('changePasswordHeaderLeft')}>
            <div className={cx('changePasswordHeaderIcon')}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHjSURBVFhH7ZTNSgJxFMWtbZgRpW4rt9EHtCiCyE1gryTSojdoo/UIUbSusDdo41driyCtIGlt/S6cibHxYxxHqOgHh9Fz77n3r44T+efX02630+gY3aF3qYYKaFdt4cPwJXTzMQB6itarWDgwd5uhL1rQQFm0hqYke21eUz3PllF8NBiWcg0+RVGVPNASo36mXjtoSqXgMKToLOcyIbsn1kPvuTLXsoPBgLQGPaGunxx/Hz1IGXnTyPnWgt+YhE80JCvLA7V76zF4XZdtfk5eQdbwEK5pyIosD9S6HoC3q/KqsoaHcEtDet541DLoHtXRnmzzo8q2ZA0P4TcbAjFZvhn5AATnkfPfX5btG2LBfwItL2mAXedU8g2ZA+XzsvxBII7KCpfQvEq+IWoPJHsa2owd2YOh2b28jIIsnyR3oRlXsgdDcwJVXMvjKvmG6Aw5Z3mDy6JK/aHZvbyCPMutZlB7RIdoA82iKFpHOeQ8/ZpoS9H+0J+kuaqgLU+o1IHV/UD+Ei0o1h/63curvZYb1mPQs4mO0C16RS1kB88j/zecQcB51NohkrK/sNp3VAoHzTQ8yw3VOlApHDSz51CVw13qRvM7FsjqQKXw0fyfeQC9HS/a1RW1jBft6opa/vlrRCKfwYiNVp/z+3IAAAAASUVORK5CYII=" />
            </div>
            <div className={cx('changePasswordHeaderTitle')}>
              <div className={cx('changePasswordHeaderTitleName')}>
                Update Password
              </div>
              <div className={cx('changePasswordHeaderTitleDescription')}>
                It's a good idea to use a strong password that you don't use elsewhere
              </div>
            </div>
            <div className={cx('clear')}></div>
          </div>
          <div className={cx('changePasswordHeaderRight')}>
            <button onClick={() => this._togglePanel()}>
              {((this.state.panelState)  ? 'Close' : 'Edit')}
            </button>
          </div>
          <div className={cx('clear')}></div>
        </div>
        <div className={cx('changePasswordContent', ((this.state.panelState)  ? '' : 'hide'))}>
          <form onSubmit={(e) => this.props._passwordEditUpdate(e)}>
            <div className={cx('settingEntryDetail')}>
              <div className={cx('settingEntryTitle')}>
                Current password:
              </div>
              <div>
                <input type="password" name="oldPassword" pattern=".{6,}" required  value={this.props.oldPassword} onChange={this.props._oldPasswordChange} />
              </div>
              <div className={cx('settingEntryTitle')}>
                New password:
              </div>
              <div>
                <input type="password" name="newPassword" pattern=".{6,}" required title="Your password should have a min. of 6 characters" value={this.props.newPassword} onChange={this.props._newPasswordChange} />
              </div>
              <div className={cx('settingEntryTitle')}>
                Retype your password:
              </div>
              <div>
                <input type="password" name="newPasswordCheck" value={this.props.newPasswordCheck} onChange={this.props._newPasswordCheckChange} />
              </div>
              <div className={cx('error', ((this.props.passwordCheckError == false)  ? 'hide' : ''))}>
                The password you have entered does not match.
              </div>
              <div className={cx('error', ((this.props.passwordUpdateError == false)  ? 'hide' : ''))}>
                Your current password does not match our existing records.
              </div>
              <div className={cx('error', ((this.props.passwordUpdateSucess == true)  ? '' : 'hide'))}>
                Your password have been successfully updated.
              </div>
            </div>
            <div className={cx('settingEntryUpdate')}>
              <button>
                Update
              </button>
            </div>
            <div className={cx('clear')}></div>
          </form>
        </div>
      </div>
    );
  }
}
