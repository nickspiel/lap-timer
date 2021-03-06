import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.svg`
  fill: ${props => props.theme.grey};
`;

const Icon = ({ className, icon }) => {
  const paths = {
    vector: <path d="M18.5 2A1.5 1.5 0 0 1 20 3.5 1.5 1.5 0 0 1 18.5 5c-.23 0-.45-.05-.65-.15l-3.69 3.7.34.45c2.19-1.26 4.76-2 7.5-2l1 .03v2.01L22 9c-2.58 0-5 .75-7 2.04A3.96 3.96 0 0 1 11.04 15C9.75 17 9 19.42 9 22l.04 1H7.03L7 22c0-2.74.74-5.31 2-7.5l-.45-.34-3.7 3.69c.1.2.15.42.15.65A1.5 1.5 0 0 1 3.5 20 1.5 1.5 0 0 1 2 18.5 1.5 1.5 0 0 1 3.5 17c.23 0 .45.05.65.15l3.69-3.7C7.31 12.78 7 11.92 7 11a4 4 0 0 1 4-4c.92 0 1.78.31 2.45.84l3.7-3.69c-.1-.2-.15-.42-.15-.65A1.5 1.5 0 0 1 18.5 2M11 9a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2z" />,
    bluetoothOff: <path d="M13 5.83l1.88 1.88-1.6 1.6 1.41 1.41 3.02-3.02L12 2h-1v5.03l2 2M5.41 4L4 5.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l4.29-4.29 2.3 2.29L20 18.59m-7-.42v-3.76l1.88 1.88" />,
    bluetoothOn: <path d="M19 10l-2 2 2 2 2-2m-6.12 4.29L13 18.17v-3.76m0-8.58l1.88 1.88L13 9.58m4.71-1.87L12 2h-1v7.58L6.41 5 5 6.41 10.59 12 5 17.58 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29M7 12l-2-2-2 2 2 2 2-2z" />,
    plus: <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />,
    minus: <path d="M19 13H5v-2h14v2z" />,
    snooze: <path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72M12 4a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9m0 16a7 7 0 0 1-7-7 7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7m-3-9h3.63L9 15.2V17h6v-2h-3.63L15 10.8V9H9v2z" />,
    chevronLeft: <path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" />,
    chevronRight: <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z" />,
    default: <path d="M19 3a2 2 0 0 1 2 2v6h-2v2h-2v2h-2v2h-2v2h-2v2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m2 12v4a2 2 0 0 1-2 2h-4v-2h2v-2h2v-2h2m-2-6.5a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5H11v-1h2v-2h2v-2h2V9h2v-.5z" />,
  };

  return (
    <Wrapper className={className} viewBox="0 0 24 24">
      {paths[icon] || paths.default}
    </Wrapper>
  );
};

Icon.defaultProps = {
  className: '',
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
