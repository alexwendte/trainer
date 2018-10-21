import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';
import Header from 'Header';
import Footer from 'Footer';
import User from 'components/User';
import Login from 'pages/Login';
import Registration from 'pages/Registration';
import Mentors from 'pages/mentors/Mentors';
import Mentor from 'pages/mentor/Mentor';
import Profile from 'pages/mentors/Profile';
import './styles/App.css';

const theme = {
  primary: '#66B9Bf',
  black: '#222222',
  grey: '#354041',
  gray: '#354041',
  green: '#0ac775',
  lightGrey: '#f1f3f4',
  lightGray: '#f1f3f4',
  maxWidth: '1000px',
  white: '#fff',
  warning: '#bb0000',
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppWrapper data-testid="app">
          <User>
            {({ user, pending, login, logout }) => (pending ? (
                <h2>Loading...</h2>
              ) : (
                <>
                  <Router>
                    <Header path="/*" user={user} logout={logout} />
                  </Router>
                  <Router>
                    <Login path="/login" login={login} />
                    <Registration path="/registration" />
                    <Mentors path="/" />
                    <Mentors path="/mentors" />
                    <Mentor path="/mentors/:mentorId" user={user} />
                    <Profile path="/profile" user={user} />
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
