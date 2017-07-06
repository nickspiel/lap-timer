import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dismissError } from '../store/creators';

const ErrorMessage = ({ message, show, dismiss }) => (
  show
  ? <p>{message}<button onClick={dismiss}>Dismiss</button></p>
  : null
);

ErrorMessage.defaultProps = {
  message: '',
  show: false,
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
  dismiss: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    message: state.ui.error.message,
    show: state.ui.error.show,
  }),
  { dismiss: dismissError },
)(ErrorMessage);
