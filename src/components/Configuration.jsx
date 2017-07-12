import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeviceButton, { deviceButtonPropTypes } from './DeviceButton';
import StepValueInput from './StepValueInput';
import {
  requestDecreaseMinimumLapTime,
  requestIncreaseMinimumLapTime,
} from '../store/requestCreators';
import {
  requestDecreaseLaps,
  requestIncreaseLaps,
} from '../store/actionCreators';
import { Label, InputGroup, SubHeading, GridCell, GridContent } from './Elements';

const Configuration = ({
  decreaseLaps,
  increaseLaps,
  deviceConnected,
  devices,
  increaseMinimumLapTime,
  decreaseMinimumLapTime,
  minLapTime,
  laps,
}) => (
  <GridCell gridArea="configuration">
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
  </GridCell>
);

Configuration.defaultProps = {
  deviceConnected: false, // TODO Remove testing code
  devices: [],
  minLapTime: '',
  laps: 0,
};

Configuration.propTypes = {
  deviceConnected: PropTypes.bool,
  devices: PropTypes.arrayOf(PropTypes.shape(deviceButtonPropTypes)),
  minLapTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  laps: PropTypes.number,
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
  }),
  {
    decreaseLaps: requestDecreaseLaps,
    increaseLaps: requestIncreaseLaps,
    increaseMinimumLapTime: requestIncreaseMinimumLapTime,
    decreaseMinimumLapTime: requestDecreaseMinimumLapTime,
  },
)(Configuration);
