import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { millisecondsToTime } from '../helpers';

const Table = styled.table`
  width: 100%;
  table-layout: auto;
  display: none;
  @media (min-width: 800px) {
    display: table;
  }
`;

const HeaderCell = styled.th`
  font-weight: normal;
  text-transform: uppercase;
  ${props => props.hideBelow &&
    `@media (max-width: ${props.hideBelow}) {
      display: none;
    }`
  }
`;

const PositionCell = styled(HeaderCell)`
  width: 4rem;
`;

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

const RacerTable = ({ racers, racerColors, raceStarted }) => (
  <Table>
    <thead>
      <tr>
        <PositionCell>Pos</PositionCell>
        <HeaderCell>Name</HeaderCell>
        <HeaderCell>Last Lap</HeaderCell>
        <HeaderCell hideBelow={'1200px'}>Best Lap</HeaderCell>
        <HeaderCell>Total</HeaderCell>
      </tr>
    </thead>
    <tbody>
      { racers.map((racer, position) => (
        <tr key={racer.id}>
          {console.log(racer)}
          <TableCell><RacerSwatch color={racerColors[racer.id]}>{raceStarted ? position + 1 : '-' }</RacerSwatch></TableCell>
          <TableCell uppercase alignLeft>{racer.name}</TableCell>
          <TimeCell>{raceStarted && racer.lastLapTime ? millisecondsToTime(racer.lastLapTime) : '-' }</TimeCell>
          <TimeCell hideBelow={'1200px'}>{raceStarted && racer.bestLapTime ? millisecondsToTime(racer.bestLapTime) : '-' }</TimeCell>
          <TimeCell>{raceStarted && racer.totalTime ? millisecondsToTime(racer.totalTime) : '-' }</TimeCell>
        </tr>
      ))}
    </tbody>
  </Table>
);

RacerTable.defaultProps = {
  racers: [],
  raceStarted: false,
};

RacerTable.propTypes = {
  racers: PropTypes.array,
  racerColors: PropTypes.array.isRequired,
  raceStarted: PropTypes.bool,
};

export default connect(
  state => ({
    racers: state.race.racers,
    racerColors: state.ui.racerColors,
    deviceConnected: state.ui.deviceConnected,
    raceStarted: state.race.raceStarted,
  }),
)(RacerTable);
