import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { millisecondsToTime } from '../helpers';

const List = styled.ol`
margin: 0;
padding: 0;
list-style: none;
@media (min-width: 800px) {
  display: none;
}
`;

const RacerSwatch = styled.span`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${props => props.color};
  margin-right: 1rem;
`;

const Racer = styled.li`
  padding-top: 1rem;
  &:not(:last-child) {
    padding-bottom: 1rem;
    border-bottom: solid 1px ${props => props.theme.lightGrey};
  }
  > * {
    margin-bottom: 0.5em;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  margin-bottom: 1em;
`;

const RacerList = ({ racers, racerColors, raceStarted }) => (
  <List>
    { racers.map((racer, position) => (
      <Racer key={racer.id}>
        <NameWrapper>
          <RacerSwatch color={racerColors[racer.id]}>{raceStarted ? position + 1 : '-' }</RacerSwatch>
          <span>{racer.name}</span>
        </NameWrapper>
        <p>Last Lap: {raceStarted && racer.lastLapTime ? millisecondsToTime(racer.lastLapTime) : '-' }</p>
        <p>Best Lap: {raceStarted && racer.bestLapTime ? millisecondsToTime(racer.bestLapTime) : '-' }</p>
        <p>Total Time: {raceStarted && racer.totalTime ? millisecondsToTime(racer.totalTime) : '-' }</p>
      </Racer>
    ))}
  </List>
);

RacerList.defaultProps = {
  racers: [],
  raceStarted: false,
};

RacerList.propTypes = {
  racers: PropTypes.array,
  racerColors: PropTypes.array.isRequired,
  raceStarted: PropTypes.bool,
};

export default connect(
  state => ({
    racers: state.race.racers,
    racerColors: state.ui.racerColors,
    deviceConnected: state.ui.deviceConnected,
  }),
)(RacerList);
