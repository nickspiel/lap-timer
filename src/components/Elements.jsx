import styled, { keyframes } from 'styled-components';

export const pulse = keyframes`
  from {
    transform: translateX(-20vw);
  }
  to {
    width: 50vw;
    transform: translateX(100vw);
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: solid 1px ${props => props.theme.lightGrey};
  flex-wrap: wrap;
`;

export const SubHeading = styled.h2`
  font-size: 0.75rem;
  padding-bottom: 0.5rem;
  margin: 0 0 0.5rem;
  font-weight: normal;
  border-bottom: solid 1px ${props => props.theme.lightGrey};
  text-transform: uppercase;
  letter-spacing: 0.25em;
`;

export const Label = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
`;

export const Loader = styled.div`
  position: absolute;
  top: 0;
  height: 0.25rem;
  width: 20vw;
  background-color: ${props => props.theme.green};
  animation: 1s ${pulse} infinite linear;
  opacity: ${props => (props.show ? 1 : 0)};
`;

export const StateMessage = styled.div`
  text-align: center;
  margin: 0;
  padding: 1rem 0;
  color: ${props => props.theme.grey};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  text-transform: uppercase;
  font-size: 0.85rem;
`;

export const GridCell = styled.div`
  background-color: white;
  padding: 1rem;
  box-shadow: ${props => props.theme.shadow};
  grid-area: ${props => props.gridArea};
  display: flex;
  flex-direction: column;
`;

export const GridContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const TextInput = styled.input`
  width: 100%;
  border: solid 1px ${props => props.theme.grey};
  padding: 0.5rem;
  margin: 0.5rem 0;
  text-transform: uppercase;
`;
