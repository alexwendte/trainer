import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';
import Header from 'Header';
import Footer from 'Footer';
import User from 'components/User';
import Registration from 'pages/Registration';
import Home from 'pages/Home';
import './styles/App.css';

const theme = {
  primary: '#66B9Bf',
  black: '#222222',
  grey: '#354041',
  green: '#0ac775',
  lightGrey: '#f1f3f4',
  maxWidth: '1000px',
  white: '#fff',
};

class App extends Component {
  // I can just pass user to ItemForm, no need for context!
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppWrapper data-testid="app">
          <Router>
            <Header path="/*" />
          </Router>
          <User>
            {({ user }) => (
              <Router>
                <Home path="/" />
                <Registration path="/registration" />
              </Router>
            )}
          </User>
          <Router primary={false}>
            <Footer path="/*" />
          </Router>
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;

const AppWrapper = styled.div``;
