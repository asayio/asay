/*
  INSTRUCTIONS
  Modal is set in App state (global) that can be set using updateState({
    entityType: 'modal'
    entity: content
  })
  The conent has three different use cases:
  1. false                     --> Modal not shown
  2. string (in defined range) --> Predefined global content
  3. object                    --> JSX
*/

import React, { Component } from 'react';
import Modal from './'; // Modal frame

// Global modal content
import UnauthorizedModal from './unauthorized';
import ErrorModal from './error';
import AddToHomeScreenAndroidModal from './addToHomeScreen/android';
import AddToHomeScreenIOSModal from './addToHomeScreen/ios';
import LoadingSpinner from '../loadingSpinner';

class ModalRoutes extends Component {
  render() {
    const modal = this.props.modal;
    const content = modal.content || false;
    if (content) {
      return <Modal content={content} />;
    } else if (modal) {
      if (modal === 'loading') {
        return <Modal content={<LoadingSpinner />} />;
      }
      if (modal === 401) {
        return <Modal content={<UnauthorizedModal updateState={this.props.updateState} />} />;
      }
      if (modal === 'addToHomeScreenAndroid') {
        return <Modal content={<AddToHomeScreenAndroidModal updateState={this.props.updateState} />} />;
      }
      if (modal === 'addToHomeScreenIOS') {
        return <Modal content={<AddToHomeScreenIOSModal updateState={this.props.updateState} />} />;
      } else {
        return <Modal content={<ErrorModal updateState={this.props.updateState} />} />;
      }
    } else return null;
  }
}

export default ModalRoutes;
