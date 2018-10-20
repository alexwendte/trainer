import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import AmountInput from 'components/AmountInput';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import User from 'components/User';
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
          <User>
            {({ user }) => (
              <>
                <AmountInput />
                <Input />
                <TextArea />
              </>
            )}
          </User>
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;

const AppWrapper = styled.div``;
