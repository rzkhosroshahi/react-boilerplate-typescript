/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'components/HomePage/Loadable';
import NotFoundPage from 'components/NotFoundPage/Loadable';

import {
  theme,
  ThemeProvider,
} from 'styles/styled-components';

import GlobalStyle from '../../global-styles';
export default function App() {
  return (
    <ThemeProvider theme={theme.default} >
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </React.Fragment>
    </ThemeProvider>
  );
}
