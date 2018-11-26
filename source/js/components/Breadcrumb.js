import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class Breadcrumb extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    }
  }
  componentDidMount(){

  }

  render() {
    let grandparentDisplay;
    let parentDisplay;
    let childDisplay;
    let grandchildDisplay;

    if(this.props.grandparentLink == ""){
      grandparentDisplay = (
        <div>
          {this.props.grandparent}
        </div>
      )
    }else{
      grandparentDisplay = (
        <Link to={this.props.grandparentLink}>
          {this.props.grandparent}
        </Link>
      )
    }
    if(this.props.parentLink == ""){
      parentDisplay = (
        <div>
          {this.props.parent}
        </div>
      )
    }else{
      parentDisplay = (
        <Link to={this.props.parentLink}>
          {this.props.parent}
        </Link>
      )
    }
    if(this.props.childLink == ""){
      childDisplay = (
        <div>
          {this.props.child}
        </div>
      )
    }else{
      childDisplay = (
        <Link to={this.props.childLink}>
          {this.props.child}
        </Link>
      )
    }
    if(this.props.grandchildLink == ""){
      grandchildDisplay = (
        <div>
          {this.props.grandchild}
        </div>
      )
    }else{
      grandchildDisplay = (
        <Link to={this.props.grandchildLink}>
          {this.props.grandchild}
        </Link>
      )
    }

    return (
      <div className={cx('breadcrumb')}>
        <div className={cx('breadcrumbLevel')}>
          {grandparentDisplay}
        </div>
        <div className={cx('breadcrumbLevelArrow',((this.props.parent == "") ? 'hide' : ''))}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVDhPY6A2YIHSJIN1QBwEYZIGpIH4MhAPUc3BYB4JgCxbB7kmECA7AZCd5AgABgYAjvQMCnH7dE4AAAAASUVORK5CYII=" />
        </div>
        <div className={cx('breadcrumbLevel',((this.props.parent == "") ? 'hide' : ''))}>
          {parentDisplay}
        </div>
        <div className={cx('breadcrumbLevelArrow',((this.props.child == "") ? 'hide' : ''))}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVDhPY6A2YIHSJIN1QBwEYZIGpIH4MhAPUc3BYB4JgCxbB7kmECA7AZCd5AgABgYAjvQMCnH7dE4AAAAASUVORK5CYII=" />
        </div>
        <div className={cx('breadcrumbLevel')}>
          {childDisplay}
        </div>
        <div className={cx('breadcrumbLevelArrow',((this.props.grandchild == "") ? 'hide' : ''))}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVDhPY6A2YIHSJIN1QBwEYZIGpIH4MhAPUc3BYB4JgCxbB7kmECA7AZCd5AgABgYAjvQMCnH7dE4AAAAASUVORK5CYII=" />
        </div>
        <div className={cx('breadcrumbLevel',((this.props.grandchild == "") ? 'hide' : ''))}>
          {grandchildDisplay}
        </div>
        <div className={cx('clear')}></div>
      </div>
    );
  }
}
