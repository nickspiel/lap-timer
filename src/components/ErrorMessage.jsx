import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dismissError } from '../store/actionCreators';
import { slideUp } from './Elements';

const Wrapper = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: ${props => props.theme.red};
  color: white;
  padding: 1rem;
  font-size: 1rem;
  animation: 0.3s ${slideUp};
  z-index: 10;
`;

const Message = styled.p`
  margin: 0;
`;

const DismissButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  color: inherit;
`;

const ErrorMessage = ({ message, show, dismiss }) => (
  <Wrapper show={show}>
    <DismissButton onClick={dismiss}>Dismiss</DismissButton>
    <Message>{message}</Message>
  </Wrapper>
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
