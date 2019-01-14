import { Router } from '@reach/router';
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import User from './components/User';
import FlashContext, { useFlash } from './contexts/FlashContext';
import Flash from './Flash';
import Footer from './Footer';
import Header from './Header';
import Login from './pages/Login';
import Mentor from './pages/mentor/Mentor';
import Mentors from './pages/mentors/Mentors';
import Profile from './pages/mentors/Profile';
import Registration from './pages/Registration';
import './styles/App.css';

const theme = {
  black: '#222222',
  gray: '#354041',
  green: '#0ac775',
  grey: '#354041',
  lightGray: '#f1f3f4',
  lightGrey: '#f1f3f4',
  maxWidth: '1000px',
  primary: '#66B9Bf',
  warning: '#bb0000',
  white: '#fff',
};

const App: React.FC = () => {
  const { flashState, setFlashState, resetFlashState } = useFlash();

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper data-testid="app">
        <FlashContext.Provider value={{ ...flashState, reset: resetFlashState, set: setFlashState }}>
          <Flash />
          <User>
            {({ user, pending, login, logout }) =>
              pending ? (
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
              )
            }
          </User>
        </FlashContext.Provider>
      </AppWrapper>
    </ThemeProvider>
  );
};
export default App;

const AppWrapper = styled.div``;
