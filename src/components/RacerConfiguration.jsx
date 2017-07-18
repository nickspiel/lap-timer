import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from './Icon';
import RacerDetails from './RacerDetails';
import { setActiveRacer } from '../store/actionCreators';
import Button from './Button';
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

const NumberOfRacers = styled.span`
  display: flex;
  align-items: center;
`;

const StepIcon = styled(Icon)`
  width: 1.5rem;
  height: 1.5rem;
`;

const RacerWrapper = styled.div`
  overflow: hidden;
`;

const RacerCarousel = styled.div`
  white-space: nowrap;
  transition: transform cubic-bezier(0, 0, 0, 1) 0.5s;
  transform: translateX(calc((-100% * ${props => props.activeRacer}) - (1rem * ${props => props.activeRacer})));
  > * {
    display: inline-block;
    width: 100%;
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const Configuration = ({
  racers,
  deviceConnected,
  activeRacer,
  setActive,
}) => (
  <GridCell gridArea="racers">
    <SubHeading>
      Racers
      <NumberOfRacers>
        <Button clear disabled={activeRacer <= 1} onClick={() => setActive(activeRacer - 1, racers.length)}><StepIcon icon="chevronLeft" /></Button>
        <span>{activeRacer} / {racers.length}</span>
        <Button clear disabled={activeRacer === racers.length} onClick={() => setActive(activeRacer + 1, racers.length)}><StepIcon icon="chevronRight" /></Button>
      </NumberOfRacers>
    </SubHeading>
    <GridContent>
      {!deviceConnected ?
        <StateMessage>
          <NoConnectionIcon icon="bluetoothOff" />
          <p>Device not connected</p>
        </StateMessage>
      :
        <RacerWrapper>
          <RacerCarousel activeRacer={activeRacer - 1}>
            {racers.map(racer => (
              <RacerDetails key={racer.id} {...racer} />
            ))}
          </RacerCarousel>
        </RacerWrapper>
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
  activeRacer: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    racers: state.race.racers,
    deviceConnected: state.ui.deviceConnected,
    activeRacer: state.ui.activeRacer,
  }),
  {
    setActive: setActiveRacer,
  },
)(Configuration);
