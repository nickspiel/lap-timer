import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from './Icon';
import RacerDetails from './RacerDetails';
import {
  requestPreviousBand,
  requestNextBand,
  requestNextChannel,
  requestPreviousChannel,
} from '../store/requestCreators';
import {
  StateMessage,
  SubHeading,
  GridCell,
  GridContent,
} from './Elements';

const NoConnectionIcon = styled(Icon)`
  width: 2rem;
  height: 2rem;
  fill: ${props => props.theme.grey};
`;

const Configuration = ({
  racers,
  deviceConnected,
}) => (
  <GridCell gridArea="racers">
    <SubHeading>Racers {racers.length}</SubHeading>
    <GridContent>
      {!deviceConnected ?
        <StateMessage>
          <NoConnectionIcon icon="bluetoothOff" />
          <p>Device not connected</p>
        </StateMessage>
      :
        racers.map(racer => (
          <RacerDetails key={racer.id} {...racer} />
        ))
      }
    </GridContent>
  </GridCell>
);

Configuration.defaultProps = {
  deviceConnected: false, // TODO Remove testing code
  racers: [],
};

Configuration.propTypes = {
  deviceConnected: PropTypes.bool,
  racers: PropTypes.array,
};

export default connect(
  state => ({
    racers: state.race.racers,
    deviceConnected: state.ui.deviceConnected,
  }),
)(Configuration);
