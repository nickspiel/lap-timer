import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Value = styled.div`
  text-align: center;
  width: 3rem;
`;

const SetValueInput = ({ increment, decrement, value, ready }) => (
  <Wrapper>
    <Button disabled={!ready} onClick={decrement}>-</Button>
    <Value>{ready ? value : '?'}</Value>
    <Button disabled={!ready} onClick={increment}>+</Button>
  </Wrapper>
);

SetValueInput.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default SetValueInput;
