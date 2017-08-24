import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import RacerLaps from './RacerLaps';

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

const RacerTable = ({ racers }) => (
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
        <RacerLaps
          key={racer.id}
          racer={racer}
          position={position}
        />
      ))}
    </tbody>
  </Table>
);

RacerTable.defaultProps = {
  racers: [],
};

RacerTable.propTypes = {
  racers: PropTypes.array,
};

export default connect(
  state => ({
    racers: state.race.racers,
  }),
)(RacerTable);
