import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from './Icon';
import { StateMessage, SubHeading, GridCell, GridContent } from './Elements';

const NotStartedIcon = styled(Icon)`
  width: 2rem;
  height: 2rem;
  fill: ${props => props.theme.grey};
`;

const RaceDetails = ({
  racers,
  raceStarted,
}) => (
  <GridCell gridArea="race">
    <SubHeading>Race</SubHeading>
    <GridContent>
      {!raceStarted ?
        <StateMessage>
          <NotStartedIcon icon="snooze" />
          <p>Race has not started</p>
        </StateMessage>
      :
        racers.map(racer => (
          <div>
            {racer.id}
          </div>
        ))
      }
    </GridContent>
  </GridCell>
);

RaceDetails.defaultProps = {
  raceStarted: false, // TODO Remove testing code
  racers: [],
};

RaceDetails.propTypes = {
  raceStarted: PropTypes.bool,
  racers: PropTypes.array,
};

export default connect(
  state => ({
    racers: state.ui.racers,
    deviceConnected: state.ui.deviceConnected,
  }),
)(RaceDetails);
