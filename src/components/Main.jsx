import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import Configuration from './Configuration';
import RacerConfiguration from './RacerConfiguration';
import RaceDetails from './RaceDetails';
import History from './History';
import { Loader } from './Elements';
import speakOnPropChange from '../speakOnPropChange';

const Wrapper = styled.main`
  position: relative;
  height: 100%;
  padding: 1rem;
  overflow: hidden;
  @media (min-width: 800px) {
    display: flex;
  }
`;

const Column = styled.div`
  &:not(:last-child) {
    @media (min-width: 800px) {
      padding-right: 1rem;
    }
  }
  > * {
    margin-bottom: 1rem;
  }
`;

const ConfigurationColumn = styled(Column)`
  width: 100%;
  max-width: 20rem;
`;

const RaceColumn = styled(Column)`
  flex-grow: 1;
`;

const Main = ({
  loading,
}) => (
  <Wrapper>
    <Loader show={loading} />
    <ErrorMessage />
    <ConfigurationColumn>
      <Configuration />
      <RacerConfiguration />
    </ConfigurationColumn>
    <RaceColumn>
      <RaceDetails />
      <History />
    </RaceColumn>
  </Wrapper>
);

Main.defaultProps = {
  loading: false,
};

Main.propTypes = {
  loading: PropTypes.bool,
};

export default
  connect(
    state => ({
      loading: state.ui.loading,
      deviceConnected: state.ui.deviceConnected,
    }),
  )(speakOnPropChange(Main, 'deviceConnected', true, 'connected'));
