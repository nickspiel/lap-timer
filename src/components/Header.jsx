import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
`;

const Header = ({ name }) => (
  <Wrapper>
    <Heading>{name}</Heading>
  </Wrapper>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
