import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

import Toggle from 'react-toggle'

export default class EmailSettings extends React.Component {
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
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH0SURBVFhH7ZW9ahRhGIU3BFIYooUaSW9jsMgdJGtjZaIh4FWIPwhBrCSVitehVmpS5ArsJIpt/MHOQiUGWVPEXZ8zPiuGdWB3ZwIK+8Dh/eZ873u+2dlltjFixH9Hu90+idbQFvqmsl7rdDonbDscOGQF7XJQGTvsL9teLx7ezimUJ5QF6mTkOl72wiXH6oHAaVR8cupN7R7YW7XnK6W+r4PAfL8JfqpVCj3r9t7Rqg5hrxIKC1ql0NtMI/WlVnUI6z7+Sa1S6Jmyd1erOuTtDHEDX7SqQ9iWoU2tUtKTXnihVR1CbyeROsiP8JZWdQg7hT4bvKrdQw615xOa1q4HApfRvgc8Q000pc6hDff20ZJj9UJw3oY/ctDfyB46tFfxInrrWaXQ8wZdcKw6ZI4ReP9XfHHAHrqGzqDivwDN6u3ZE+6yHDNmeAh6YOh31HL9mDJhS25yQi97rfS6vmfLcJBx8Y/Q82iey+5LaZNyJHId8nc8b2/3JhaNGwxm86k+GHJFO/4c1x/1n0eu483Zlid3Vf8d5ffT6hsGLxvwmjKuXYB3Gr3Pfsg6ntsF2OPOZn9Fu38YeuTwda0D4M/kADWjfQD8G2Y81OofhvLoMjyr1QN7xyMve2DvrBnbWv3DUPcXf1RrYBg/ZkZLa8SIf41G4ycNahipDQ/c3wAAAABJRU5ErkJggg==" />
            </div>
            <div className={cx('changePasswordHeaderTitle')}>
              <div className={cx('changePasswordHeaderTitleName')}>
                General profile
              </div>
              <div className={cx('changePasswordHeaderTitleDescription')}>
                Update your latest profile details to better safeguard your account
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

        </div>
      </div>
    );
  }
}
