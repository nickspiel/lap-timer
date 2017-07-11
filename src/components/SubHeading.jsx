import styled from 'styled-components';

export const SubHeading = styled.h2`
  font-size: 0.75rem;
  padding-bottom: 0.5rem;
  margin: 0 0 0.5rem;
  font-weight: normal;
  border-bottom: solid 1px ${props => props.theme.lightGrey};
  text-transform: uppercase;
  letter-spacing: 0.25em;
`;

export default SubHeading;
