import React from 'react';
import PropTypes from 'prop-types';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import Main from './components/Main';
import Header from './components/Header';
import montserratLight from './assets/fonts/montserrat-light.woff2';
import montserratRegular from './assets/fonts/montserrat-regular.woff2';
import montserratBold from './assets/fonts/montserrat-bold.woff2';

injectGlobal`
  @font-face {
    font-family: Montserrat;
    src: url(${montserratLight});
    font-weight: 200;
  }

  @font-face {
    font-family: Montserrat;
    src: url(${montserratRegular});
    font-weight: normal;
  }

  @font-face {
    font-family: Montserrat;
    src: url(${montserratBold});
    font-weight: bold;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: Montserrat;
    font-weight: 300;
    margin: 0;
    background-color: whitesmoke;
    color: darkgrey;
    height: 100vh;
    overflow: hidden;
    font-size: 16px;
  }
`;

const theme = {
  darkBlue: '#2D3E4F',
  green: '#0FC3AA',
  grey: 'darkgrey',
  lightGrey: 'whitesmoke',
  red: '#FF5C5C',
  shadow: '0 2px 5px 0 rgba(0, 0, 0, 0.125)',
};

const AppContainer = ({ store }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <div>
        <Header name="Lap Timer" />
        <Main />
      </div>
    </ThemeProvider>
  </Provider>
);

AppContainer.propTypes = {
  store: PropTypes.object.isRequired,
};

export default AppContainer;
