import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class ModalDelete extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    }
  }
  componentDidMount(){

  }

  render() {
    return (
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
    );
  }
}
