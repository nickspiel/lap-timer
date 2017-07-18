import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.button`
  border: none;
  color: white;
  padding: ${props => (props.clear ? '0.5rem' : '1em')};
  background-color: ${props => (props.clear ? 'transparent' : props.theme.green)};
  text-transform: uppercase;
  letter-spacing: 0.125rem;
  cursor: pointer;
  outline: none;
  &:disabled {
    background-color: ${props => (props.clear ? 'transparent' : props.theme.grey)};
    cursor: not-allowed;
    opacity: 0.25;
  }
`;

const Button = ({ children, disabled, onClick, clear }) => (
  <Wrapper clear={clear} onClick={onClick} disabled={disabled}>{children}</Wrapper>
);

Button.defaultProps = {
  disabled: false,
  clear: false,
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  clear: PropTypes.bool,
};

export default Button;
