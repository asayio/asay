/*
  INSTRUCTIONS
  Modal is set in App state (global) that can be set using updateState({
    entityType: 'modal'
    entity: content
  })
  The content has three different use cases:
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
  componentWillMount() {
    /* Global validation to help users on mobile add to home screen */
    window.localStorage.promptAddToHomeScreen === undefined &&
      navigator.userAgent.match(/iPhone|iPad|iPod/i) &&
      this.props.updateState({ entityType: 'modal', entity: 'addToHomeScreenIOS' });
    window.localStorage.promptAddToHomeScreen === undefined &&
      navigator.userAgent.match(/Android/i) &&
      this.props.updateState({ entityType: 'modal', entity: 'addToHomeScreenAndroid' });

    /* Global event listener, to enable closing modal by clicking outside modal */
    document.addEventListener(
      'click',
      function(evnt) {
        evnt.target.id === 'modal' && this.props.updateState({ entityType: 'modal', entity: false });
      }.bind(this)
    );
  }

  render() {
    const modal = this.props.modal;
    const content = modal.content || false;
    if (content) {
      return <Modal updateState={this.props.updateState}>{content}</Modal>;
    } else if (modal) {
      if (modal === 'loading') {
        return (
          <Modal>
            <LoadingSpinner />
          </Modal>
        );
      }
      if (modal === 401) {
        return (
          <Modal updateState={this.props.updateState}>
            <UnauthorizedModal />
          </Modal>
        );
      }
      if (modal === 'addToHomeScreenAndroid') {
        return (
          <Modal updateState={this.props.updateState}>
            <AddToHomeScreenAndroidModal updateState={this.props.updateState} />
          </Modal>
        );
      }
      if (modal === 'addToHomeScreenIOS') {
        return (
          <Modal updateState={this.props.updateState}>
            <AddToHomeScreenIOSModal updateState={this.props.updateState} />
          </Modal>
        );
      } else {
        return (
          <Modal updateState={this.props.updateState}>
            <ErrorModal updateState={this.props.updateState} />
          </Modal>
        );
      }
    } else return null;
  }
}

export default ModalRoutes;
