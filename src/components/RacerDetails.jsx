import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { InputGroup, Label, TextInput } from './Elements';
import StepValueInput from './StepValueInput';
import Button from './Button';
import {
  requestPreviousBand,
  requestNextBand,
  requestPreviousChannel,
  requestNextChannel,
  requestRssiMonitorOn,
  requestRssiMonitorOff,
} from '../store/requestCreators';
import {
  updateRacerNameAction,
  setRacerRSSIThreshold,
} from '../store/actionCreators'; // TODO Temp

const FillBar = styled.div`
  background-color: ${props => props.theme.lightGrey};
  width: 100%;
  height: 0.5rem;
  margin: 1rem 0;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: ${props => `${100 - ((props.value / 300) * 100)}%`};
    background-color: ${props => props.theme.green};
  }
`;

const RacerDetails = ({
  name,
  id,
  band,
  channel,
  rssiThreshold,
  deviceConnected,
  decrementBand,
  incrementBand,
  decrementChannel,
  incrementChannel,
  updateRacerName,
  rssiMonitorOn,
  rssiMonitorOff,
  rssiMonitoring,
  rssiValue,
  setRSSIThreshold,
}) => (
  <div>
    <InputGroup>
      <Label>Name</Label>
      <TextInput type="text" value={name} onChange={event => updateRacerName(id, event.currentTarget.value)} />
    </InputGroup>
    <InputGroup>
      <Label>Band</Label>
      <StepValueInput
        ready={deviceConnected}
        decrement={() => decrementBand(id)}
        increment={() => incrementBand(id)}
        value={band}
      />
    </InputGroup>
    <InputGroup>
      <Label>Channel</Label>
      <StepValueInput
        ready={deviceConnected}
        decrement={() => decrementChannel(id)}
        increment={() => incrementChannel(id)}
        value={channel}
      />
    </InputGroup>
    <InputGroup>
      <Label>RSSI Threshold</Label>
      <span>{rssiThreshold}</span>
      <FillBar value={rssiValue} />
      {rssiMonitoring
        ? <Button onClick={() => rssiMonitorOff(id)}>Stop</Button>
        : <Button onClick={() => rssiMonitorOn(id)}>Read</Button>
      }
      {rssiMonitoring && <span>{rssiValue}</span>}
      <Button onClick={() => setRSSIThreshold(id, rssiValue)}>Set</Button>
    </InputGroup>
  </div>
);

RacerDetails.defaultProps = {
  name: '',
  band: 0,
  channel: 0,
  rssiMonitoring: false,
  rssiValue: 0,
  rssiThreshold: 0,
};

RacerDetails.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  band: PropTypes.number,
  channel: PropTypes.number,
  rssiThreshold: PropTypes.number,
  deviceConnected: PropTypes.bool.isRequired,
  decrementBand: PropTypes.func.isRequired,
  incrementBand: PropTypes.func.isRequired,
  decrementChannel: PropTypes.func.isRequired,
  incrementChannel: PropTypes.func.isRequired,
  updateRacerName: PropTypes.func.isRequired,
  rssiMonitorOn: PropTypes.func.isRequired,
  rssiMonitorOff: PropTypes.func.isRequired,
  rssiMonitoring: PropTypes.bool,
  rssiValue: PropTypes.number,
  setRSSIThreshold: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    deviceConnected: state.ui.deviceConnected,
    rssiMonitoring: state.ui.rssiMonitoring,
    rssiValue: state.ui.rssiValue,
  }), {
    decrementBand: requestPreviousBand,
    incrementBand: requestNextBand,
    decrementChannel: requestPreviousChannel,
    incrementChannel: requestNextChannel,
    updateRacerName: updateRacerNameAction,
    rssiMonitorOn: requestRssiMonitorOn,
    rssiMonitorOff: requestRssiMonitorOff,
    setRSSIThreshold: setRacerRSSIThreshold,
  },
)(RacerDetails);
