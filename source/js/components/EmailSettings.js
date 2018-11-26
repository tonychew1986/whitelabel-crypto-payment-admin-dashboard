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
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGISURBVFhH7ZJBTgJREEQJG3XJAfAG7jUs9RR4DG+Begd3egcTrqFu9QCwdCGDVc1zwtATBwxjWMxLOv//rur6MwO9jo6Og2L5T3BdBr11uC6DviyK4ov1RXWOvDOedcZ6pkHOoNtcGVTdqk6wNWIvM5UX8d5gy6CHQcuxhiYbIRdh/AV77GXGDz9xljX3TBjrQK8YFLD+NRaqO1X6Gu6hLfCmn899wzGDngxqbX6NV1X5Nbx3D63y1utYNxwz6LUGtfuqhzAIXeKvcU/FW4M9fcYqrOQ/PIAuGKqm1rSaZ1V5qff0Cs5T1ZDxkjALjhn0ikFBY9XMfa0fWq7oj1Rv1Mg9a3jsnanG7v/gvuGYQQ+DloECHledCHzSMggjqHfk4hjYgzcgI+ZWnS0eQEOXqneOc+2vsWyNZzzrAGc503uDJYPugfK31HKKvDOeJaPMNMgZdJs/VTfa1v6bd8EZznJmhAukDLof4IzW3nAm8c0PwHHvEN/8AG3DdRn01uG6jo6OQ6DX+wZXHmlLkF7tGAAAAABJRU5ErkJggg==" />
            </div>
            <div className={cx('changePasswordHeaderTitle')}>
              <div className={cx('changePasswordHeaderTitleName')}>
                Email Notifications
              </div>
              <div className={cx('changePasswordHeaderTitleDescription')}>
                Add extra security to notification emails
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
          <Toggle
          id='cheese-status'
          checked={this.props.emailNotificationState}
          onChange={this.props._emailNotificationChange} />
        </div>
      </div>
    );
  }
}
