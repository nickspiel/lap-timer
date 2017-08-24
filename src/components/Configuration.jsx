import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DeviceButton, { deviceButtonPropTypes } from './DeviceButton';
import StepValueInput from './StepValueInput';
import Button from './Button';
import {
  requestDecreaseMinimumLapTime,
  requestIncreaseMinimumLapTime,
} from '../store/requestCreators';
import {
  requestDecreaseLaps,
  requestIncreaseLaps,
} from '../store/actionCreators';
import { Label, InputGroup, SubHeading, GridCell, GridContent } from './Elements';

const CalibrateButton = styled(Button)`
  display: none;
`;

const Configuration = ({
  decreaseLaps,
  increaseLaps,
  deviceConnected,
  devices,
  racers,
  increaseMinimumLapTime,
  decreaseMinimumLapTime,
  minLapTime,
  laps,
}) => (
  <GridCell>
    <SubHeading>Configuration</SubHeading>
    <GridContent>
      {!deviceConnected ?
        devices.map(device => (
          <DeviceButton key={device.address} {...device} />
        ))
      :
        <div>
          <InputGroup>
            <Label>Laps</Label>
            <StepValueInput
              ready={deviceConnected}
              decrement={decreaseLaps}
              increment={increaseLaps}
              value={laps}
            />
          </InputGroup>
          <InputGroup>
            <Label>Minimum Lap Time</Label>
            <StepValueInput
              ready={deviceConnected}
              decrement={decreaseMinimumLapTime}
              increment={increaseMinimumLapTime}
              value={minLapTime}
            />
          </InputGroup>
        </div>
      }
    </GridContent>
    {deviceConnected && racers.length > 1 &&
      <InputGroup>
        {/* // TODO Calibrate timers */}
        <CalibrateButton onClick={() => {}}>Calibrate Timers</CalibrateButton>
      </InputGroup>
    }
  </GridCell>
);

Configuration.defaultProps = {
  deviceConnected: false,
  devices: [],
  minLapTime: '',
  laps: 0,
  racers: [],
};

Configuration.propTypes = {
  deviceConnected: PropTypes.bool,
  devices: PropTypes.arrayOf(PropTypes.shape(deviceButtonPropTypes)),
  minLapTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  laps: PropTypes.number,
  racers: PropTypes.array,
  decreaseLaps: PropTypes.func.isRequired,
  increaseLaps: PropTypes.func.isRequired,
  increaseMinimumLapTime: PropTypes.func.isRequired,
  decreaseMinimumLapTime: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    devices: state.devices,
    deviceConnected: state.ui.deviceConnected,
    minLapTime: state.race.minLapTime,
    laps: state.race.laps,
    racers: state.race.racers,
  }),
  {
    decreaseLaps: requestDecreaseLaps,
    increaseLaps: requestIncreaseLaps,
    increaseMinimumLapTime: requestIncreaseMinimumLapTime,
    decreaseMinimumLapTime: requestDecreaseMinimumLapTime,
  },
)(Configuration);
