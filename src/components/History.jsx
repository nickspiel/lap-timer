import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from './Icon';
import { StateMessage, SubHeading, GridCell, GridContent } from './Elements';
import { longestLapTime, shortestLapTime } from '../helpers';

const racerColor = ['#9C27B0', '#C2185B', '#303F9F', '#0097A7', '#388E3C', '#FF5722'];

const NotStartedIcon = styled(Icon)`
  width: 2rem;
  height: 2rem;
  fill: ${props => props.theme.grey};
`;

const Chart = styled.div`
  height: 16rem;
  position: relative;
`;

const Times = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Lap = styled.div`
  color: transparent;
  flex-basis: ${props => `${(1 / props.laps) * 100}%`};
  position: relative;
  margin: 2rem 0;
`;

const Time = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${props => racerColor[props.id]};
  position: absolute;
  bottom: ${props => `${((props.time - props.shortestLapTime) / (props.longestLapTime - props.shortestLapTime)) * 100}%`};
  left: 50%;
  transform: translateX(-50%) translateY(50%);
`;

const RaceDetails = ({
  racers,
  raceStarted,
  laps,
  racerColors,
}) => (
  <GridCell>
    <SubHeading>History</SubHeading>
    <GridContent>
      {!raceStarted ?
        <StateMessage>
          <NotStartedIcon icon="snooze" />
          <p>Race has not started</p>
        </StateMessage>
      :
        <LineChart
          data={[
            {
              name: 'lap 1',
              0: 132456,
              1: 353436,
            },
            {
              name: 'lap 1',
              0: 142456,
              1: 343436,
            },
            {
              name: 'lap 1',
              0: 122456,
              1: 333436,
            },
          ]}
          width={600}
          height={400}
        >
          {console.log(racers.map(racer => ({ lap: racer.id, times: racer.lapTimes})))}
          <Line type="monotone" dataKey={0} stroke="#8884d8" />
          <Line type="monotone" dataKey={1} stroke="red" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="lap" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      }
    </GridContent>
  </GridCell>
);

RaceDetails.defaultProps = {
  raceStarted: false,
  deviceConnected: false,
  racers: [],
  laps: 0,
};

RaceDetails.propTypes = {
  raceStarted: PropTypes.bool,
  racers: PropTypes.array,
  laps: PropTypes.number,
  racerColors: PropTypes.array.isRequired,
};

export default connect(
  state => ({
    racers: state.race.racers,
    laps: state.race.laps,
    racerColors: state.ui.racerColors,
    deviceConnected: state.ui.deviceConnected,
  }),
)(RaceDetails);
