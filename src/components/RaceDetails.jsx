import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from './Icon';
import Button from './Button';
import { requestStartRace, requestEndRace } from '../store/requestCreators';
import { StateMessage, SubHeading, GridCell, GridContent } from './Elements';
import RacerTable from './RacerTable';
import RacerList from './RacerList';

const NotStartedIcon = styled(Icon)`
  width: 2rem;
  height: 2rem;
  fill: ${props => props.theme.grey};
`;

const RaceDetails = ({
  raceStarted,
  deviceConnected,
  startRace,
  endRace,
}) => (
  <GridCell>
    <SubHeading>
      Race
      {raceStarted
        ? <Button onClick={() => endRace()}>End</Button>
        : <Button onClick={() => startRace()}>Start</Button>
      }
    </SubHeading>
    <GridContent>
      {!deviceConnected ?
        <StateMessage>
          <NotStartedIcon icon="snooze" />
          <p>Race has not started</p>
        </StateMessage>
      :
        <div>
          <RacerTable />
          <RacerList />
        </div>
      }
    </GridContent>
  </GridCell>
);

RaceDetails.defaultProps = {
  raceStarted: false,
  deviceConnected: false,
  racers: [],
};

RaceDetails.propTypes = {
  raceStarted: PropTypes.bool,
  deviceConnected: PropTypes.bool,
  startRace: PropTypes.func.isRequired,
  endRace: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    deviceConnected: state.ui.deviceConnected,
    raceStarted: state.race.raceStarted,
  }),
  {
    startRace: requestStartRace,
    endRace: requestEndRace,
  },
)(RaceDetails);
