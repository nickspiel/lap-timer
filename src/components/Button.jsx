import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.button`
  border: none;
  color: white;
  padding: 1em;
  background-color: ${props => props.theme.green};
  text-transform: uppercase;
  letter-spacing: 0.125rem;
  cursor: pointer;
  outline: none;
  &:disabled {
    background-color: ${props => props.theme.grey};
    cursor: not-allowed;
  }
`;

const Button = ({ children, disabled, onClick }) => (
  <Wrapper onClick={onClick} disabled={disabled}>{children}</Wrapper>
);

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Button;
