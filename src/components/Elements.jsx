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

export const StateMessage = styled.p`
  text-align: center;
  margin: 0;
  padding: 1rem 0;
  color: ${props => props.theme.lightGrey};
`;
