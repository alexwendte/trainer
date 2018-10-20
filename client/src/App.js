import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';
import Header from 'Header';
import Footer from 'Footer';
import User from 'components/User';
import Login from 'pages/Login';
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
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppWrapper data-testid="app">
          <User>
            {({ user, pending, logout }) => (pending ? (
                <h2>Loading...</h2>
              ) : (
                <>
                  <Router>
                    <Header path="/*" user={user} logout={logout} />
                  </Router>
                  <Router>
                    <Home path="/" />
                    <Login path="/login" />
                    <Registration path="/registration" />
                  </Router>
                  <Router primary={false}>
                    <Footer path="/*" />
                  </Router>
                </>
              ))
            }
          </User>
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;

const AppWrapper = styled.div``;
