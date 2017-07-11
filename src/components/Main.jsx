import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  requestStartRace,
} from '../store/requestCreators';
import { SubHeading } from './SubHeading';
import ErrorMessage from './ErrorMessage';
import Button from './Button';
import Configuration from './Configuration';
import RacerConfiguration from './RacerConfiguration';
import { Loader } from './Elements';

const Wrapper = styled.main`
  position: relative;
  height: 100%;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 20rem 2fr;
  grid-template-rows: auto;
  grid-template-areas:
    "configuration race"
    "racers race"
    "racers history";
  align-content: stretch;
`;

const GridCell = styled.div`
  background-color: white;
  padding: 1rem;
  box-shadow: ${props => props.theme.shadow};
  grid-area: ${props => props.gridArea};
`;

const Main = ({
  startRace,
  loading,
}) => (
  <Wrapper>
    <Loader show={loading} />
    <ErrorMessage />
    <GridCell gridArea="configuration">
      <Configuration />
    </GridCell>
    <GridCell gridArea="race">
      <SubHeading>Race</SubHeading>
      <Button onClick={startRace}>Start Race</Button>
    </GridCell>
    <GridCell gridArea="racers">
      <RacerConfiguration />
    </GridCell>
    <GridCell gridArea="history">
      <SubHeading>History</SubHeading>
    </GridCell>
  </Wrapper>
);

Main.defaultProps = {
  loading: false,
};

Main.propTypes = {
  startRace: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default connect(
  state => ({
    loading: state.ui.loading,
  }),
  {
    startRace: requestStartRace,
  },
)(Main);
