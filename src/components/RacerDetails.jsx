import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { withState } from 'recompose';
import { InputGroup, Label, TextInput } from './Elements';
import StepValueInput from './StepValueInput';
import {
  requestPreviousBand,
  requestNextBand,
  requestPreviousChannel,
  requestNextChannel,
} from '../store/requestCreators';
import { updateRacerNameAction } from '../store/actionCreators';

// const enhance = withState('name', 'setName', '');

const RacerDetails = ({
  name,
  id,
  deviceConnected,
  decrementBand,
  incrementBand,
  decrementChannel,
  incrementChannel,
  updateRacerName,
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
);

RacerDetails.defaultProps = {
  name: '',
};

RacerDetails.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  deviceConnected: PropTypes.bool.isRequired,
  decrementBand: PropTypes.func.isRequired,
  incrementBand: PropTypes.func.isRequired,
  decrementChannel: PropTypes.func.isRequired,
  incrementChannel: PropTypes.func.isRequired,
  updateRacerName: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    deviceConnected: state.ui.deviceConnected,
  }), {
    decrementBand: requestPreviousBand,
    incrementBand: requestNextBand,
    decrementChannel: requestPreviousChannel,
    incrementChannel: requestNextChannel,
    updateRacerName: updateRacerNameAction,
  },
)(RacerDetails);
