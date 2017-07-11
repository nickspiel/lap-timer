import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { requestConnectDevice } from '../store/requestCreators';

const Wrapper = styled.button`
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  font-size: 0.85rem;
  cursor: pointer;
  outline: none;
  padding: 0.5rem 0;
  &:not(:last-child) {
    border-bottom: solid 1px ${props => props.theme.lightGrey};
  }
`;

const Name = styled.p`
  margin-top: 0;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.green};
`;

const Address = styled.p`
  margin-bottom: 0;
  padding-bottom: 0.5rem;
  color: ${props => props.theme.grey};
`;

const DeviceButton = ({ name, address, requestConnectDeviceAction }) => (
  <Wrapper type="transparent" onClick={() => requestConnectDeviceAction(address)}>
    <Name>{name}</Name>
    <Address>{address}</Address>
  </Wrapper>
);

export const deviceButtonPropTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

DeviceButton.propTypes = {
  ...deviceButtonPropTypes,
  requestConnectDeviceAction: PropTypes.func.isRequired,
};

export default connect(
  null,
  { requestConnectDeviceAction: requestConnectDevice },
)(DeviceButton);
