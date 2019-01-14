import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import styled from 'styled-components';

import Input from '../components/Input';
import FlashContext from '../contexts/FlashContext';
import { SubmitButton } from '../styles/comp';
import { IForm } from '../types';

interface IProps extends RouteComponentProps {
  login: (args: any) => Promise<{}>;
}

const Login: React.FC<IProps> = ({ login }) => {
  const flashContext = React.useContext(FlashContext);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement> & IForm) => {
    ev.preventDefault();
    const { email, password } = ev.currentTarget.elements;
    login({
      email: email.value,
      password: password.value,
    }).catch((err: any) => {
      console.error(err);
      if (err.response.status === 401) {
        flashContext.set({ message: 'Incorrect Email or Password', isError: true });
      }
    });
  };

  return (
    <>
      <RegisterWrapper>
        <Heading>
          Login{' '}
          <span role="img" aria-label="Thumbs up">
            👍
          </span>
        </Heading>
        <StyledForm onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="email">Email</label>
            <Input type="email" id="email" required={true} />
          </InputGroup>
          <InputGroup>
            <label htmlFor="password">Password</label>
            <Input type="password" id="password" required={true} />
          </InputGroup>
          <SubmitButton type="submit">Log In!</SubmitButton>
        </StyledForm>
      </RegisterWrapper>
    </>
  );
};

export default Login;

const RegisterWrapper = styled.div`
  padding: 2rem 0;
`;

const Heading = styled.h1`
  color: ${props => props.theme.primary};
  text-align: center;
  padding-bottom: 2rem;
  span {
    font-size: 3rem;
  }
`;

const StyledForm = styled.form`
  width: 60rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin: 0 0.5rem 1rem;
  flex-grow: 1;
  label,
  legend {
    color: ${props => props.theme.grey};
    padding-bottom: 0.5rem;
  }
  label,
  input {
    display: block;
  }
  input {
    width: 100%;
    border-radius: 5px;
    padding: 0.7rem 1.2rem;
    height: 3.4rem;
    border: none;
    background: ${props => props.theme.lightGrey};
  }
`;
