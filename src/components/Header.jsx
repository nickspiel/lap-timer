import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import fastClock from '../assets/icons/clock-fast.svg';

const Wrapper = styled.header`
  background-color: ${props => props.theme.darkBlue};
  color: white;
  padding: 1rem;
  box-shadow: ${props => props.theme.shadow};
`;

const Heading = styled.h1`
  font-size: 1.3rem;
  margin: 0;
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  margin-right: 1rem;
  width: 2rem;
`;

const Header = ({ name }) => (
  <Wrapper>
    <Heading><Logo src={fastClock} alt="" /><span>{name}</span></Heading>
  </Wrapper>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
