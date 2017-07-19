import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from './Icon';
import { StateMessage, SubHeading, GridCell, GridContent } from './Elements';
import { millisecondsToTime } from '../helpers';

const racerColor = ['#9C27B0', '#C2185B', '#303F9F', '#0097A7', '#388E3C', '#FF5722'];

const NotStartedIcon = styled(Icon)`
  width: 2rem;
  height: 2rem;
  fill: ${props => props.theme.grey};
`;

const RacerTable = styled.table`
  width: 100%;
  table-layout: auto;
`;

const HeaderCell = styled.th`
  font-weight: normal;
  text-transform: uppercase;
`;

const PositionCell = styled(HeaderCell)`
  width: 4rem;
`;

const TableCell = styled.td`
  text-align: ${props => (props.alignLeft ? 'left' : 'center')};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'normal')};
  border-top: solid 1px ${props => props.theme.lightGrey};
  padding: 1rem;
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
  background-color: ${props => racerColor[props.id]};
`;

const RaceDetails = ({
  racers,
  raceStarted,
  deviceConnected,
}) => (
  <GridCell gridArea="race">
    <SubHeading>Race</SubHeading>
    <GridContent>
      {!deviceConnected ?
        <StateMessage>
          <NotStartedIcon icon="snooze" />
          <p>Race has not started</p>
        </StateMessage>
      :
        <RacerTable>
          <thead>
            <tr>
              <PositionCell>Pos</PositionCell>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Last Lap</HeaderCell>
              <HeaderCell>Best Lap</HeaderCell>
              <HeaderCell>Total</HeaderCell>
            </tr>
          </thead>
          <tbody>
            { racers.map((racer, position) => (
              <tr key={racer.id}>
                <TableCell><RacerSwatch id={racer.id}>{raceStarted ? position + 1 : '-' }</RacerSwatch></TableCell>
                <TableCell uppercase alignLeft>{racer.name}</TableCell>
                <TimeCell>{raceStarted && racer.lastLapTime ? millisecondsToTime(racer.lastLapTime) : '-' }</TimeCell>
                <TimeCell>{raceStarted && racer.bestLapTime ? millisecondsToTime(racer.bestLapTime) : '-' }</TimeCell>
                <TimeCell>{raceStarted && racer.totalTime ? millisecondsToTime(racer.totalTime) : '-' }</TimeCell>
              </tr>
            ))}
          </tbody>
        </RacerTable>
      }
    </GridContent>
  </GridCell>
);

RaceDetails.defaultProps = {
  raceStarted: true, // TODO Remove testing code
  deviceConnected: true, // TODO Remove testing code
  racers: [],
};

RaceDetails.propTypes = {
  raceStarted: PropTypes.bool,
  deviceConnected: PropTypes.bool,
  racers: PropTypes.array,
};

export default connect(
  state => ({
    racers: state.race.racers,
    deviceConnected: state.ui.deviceConnected,
  }),
)(RaceDetails);
