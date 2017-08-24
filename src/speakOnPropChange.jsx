import React, { Component } from 'react';
import speakLine from './speakLine';

const speakOnPropChange = (WrapperComponent, prop, value = '', words = '') => class extends Component {
  componentWillUpdate(nextProps) {
    if (nextProps[prop] === value) {
      speakLine(words);
    }
  }
  render() {
    return (
      <WrapperComponent {...this.props} />
    );
  }
};

export default speakOnPropChange;
