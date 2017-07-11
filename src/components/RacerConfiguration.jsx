import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubHeading } from './SubHeading';
import StepValueInput from './StepValueInput';
import {
  requestPreviousBand,
  requestNextBand,
  requestNextChannel,
  requestPreviousChannel,
} from '../store/requestCreators';
import {
  Label,
  InputGroup,
  StateMessage,
} from './Elements';

const Configuration = ({
  racers,
  deviceConnected,
  decrementBand,
  incrementBand,
  decrementChannel,
  incrementChannel,
}) => (
  <div>
    <SubHeading>Racers</SubHeading>
    {!deviceConnected ? <StateMessage>Device not connected</StateMessage> :
    racers.map(racer => (
      <div key={racer.id} {...racer}>
        <InputGroup>
          <Label>Band</Label>
          <StepValueInput
            ready={deviceConnected}
            decrement={decrementBand}
            increment={incrementBand}
            value={''}
          />
        </InputGroup>
        <InputGroup>
          <Label>Channel</Label>
          <StepValueInput
            ready={deviceConnected}
            decrement={decrementChannel}
            increment={incrementChannel}
            value={''}
          />
        </InputGroup>
      </div>
    ))
    }
  </div>
);

Configuration.defaultProps = {
  deviceConnected: false, // TODO Remove testing code
  racers: [],
};

Configuration.propTypes = {
  deviceConnected: PropTypes.bool,
  decrementBand: PropTypes.func.isRequired,
  incrementBand: PropTypes.func.isRequired,
  decrementChannel: PropTypes.func.isRequired,
  incrementChannel: PropTypes.func.isRequired,
  racers: PropTypes.array,
};

export default connect(
  state => ({
    racers: state.ui.racers,
    deviceConnected: state.ui.deviceConnected,
  }),
  {
    decrementBand: requestPreviousBand,
    incrementBand: requestNextBand,
    decrementChannel: requestPreviousChannel,
    incrementChannel: requestNextChannel,
  },
)(Configuration);
