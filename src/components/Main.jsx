import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import Configuration from './Configuration';
import RacerConfiguration from './RacerConfiguration';
import RaceDetails from './RaceDetails';
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

const Main = ({
  loading,
}) => (
  <Wrapper>
    <Loader show={loading} />
    <ErrorMessage />
    <Configuration />
    <RaceDetails />
    <RacerConfiguration />
  </Wrapper>
);

Main.defaultProps = {
  loading: false,
};

Main.propTypes = {
  loading: PropTypes.bool,
};

export default connect(
  state => ({
    loading: state.ui.loading,
  }),
)(Main);
