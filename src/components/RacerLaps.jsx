import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { millisecondsToTime, millisecondsToSpokenTime } from '../helpers';
import speakLine from '../speakLine';

const TableCell = styled.td`
  text-align: ${props => (props.alignLeft ? 'left' : 'center')};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'normal')};
  border-top: solid 1px ${props => props.theme.lightGrey};
  padding: 1rem;
  ${props => props.hideBelow &&
    `@media (max-width: ${props.hideBelow}) {
      display: none;
    }`
  }
`;

const TimeCell = styled(TableCell)`
  letter-spacing: 0.2em;
`;

const RacerSwatch = styled.span`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${props => props.color};
`;

class RacerLaps extends Component {
  // TODO Make this a HOC
  componentWillUpdate(nextProps) {
    if (nextProps.racer.totalTime !== this.props.racer.totalTime) {
      speakLine(`${nextProps.racer.name} ${millisecondsToSpokenTime(nextProps.racer.lastLapTime)}`);
    }
  }
  render() {
    const { position, racerColors, raceStarted, racer } = this.props;
    return (
      <tr>
        <TableCell><RacerSwatch color={racerColors[racer.id]}>{raceStarted ? position + 1 : '-' }</RacerSwatch></TableCell>
        <TableCell uppercase alignLeft>{racer.name}</TableCell>
        <TimeCell>{raceStarted && racer.lastLapTime ? millisecondsToTime(racer.lastLapTime) : '-' }</TimeCell>
        <TimeCell hideBelow={'1200px'}>{raceStarted && racer.bestLapTime ? millisecondsToTime(racer.bestLapTime) : '-' }</TimeCell>
        <TimeCell>{raceStarted && racer.totalTime ? millisecondsToTime(racer.totalTime) : '-' }</TimeCell>
      </tr>
    );
  }
}

RacerLaps.propTypes = {
  position: PropTypes.number.isRequired,
  racerColors: PropTypes.array.isRequired,
  raceStarted: PropTypes.bool.isRequired,
  racer: PropTypes.shape({
    name: PropTypes.string,
    totalTime: PropTypes.number,
    bestLapTime: PropTypes.number,
    lastLapTime: PropTypes.number,
  }).isRequired,
};

export default connect(
  state => ({
    racerColors: state.ui.racerColors,
    deviceConnected: state.ui.deviceConnected,
    raceStarted: state.race.raceStarted,
  }),
)(RacerLaps);
