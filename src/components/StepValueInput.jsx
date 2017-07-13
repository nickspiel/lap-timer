import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import Icon from './Icon';

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Value = styled.div`
  text-align: center;
  width: 3rem;
`;

const ToggleIcon = styled(Icon)`
  width: 0.75rem;
  height: 0.75rem;
  fill: white;
`;

const SetValueInput = ({ increment, decrement, value, ready }) => (
  <Wrapper>
    <Button disabled={!ready} onClick={decrement}>
      <ToggleIcon icon="minus" />
    </Button>
    <Value>{ready ? value : '?'}</Value>
    <Button disabled={!ready} onClick={increment}>
      <ToggleIcon icon="plus" />
    </Button>
  </Wrapper>
);

SetValueInput.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  ready: PropTypes.bool.isRequired,
};

export default SetValueInput;
