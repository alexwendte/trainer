import { navigate, RouteComponentProps } from '@reach/router';
import * as React from 'react';
import styled from 'styled-components';

import Input from '../components/Input';
import FlashContext from '../contexts/FlashContext';
import { SubmitButton } from '../styles/comp';
import { IApiError, IForm } from '../types';
import * as api from '../utils/api';

const Registration: React.FC<RouteComponentProps> = () => {
  const flashContext = React.useContext(FlashContext);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement> & IForm) => {
    ev.preventDefault();
    const { name, email, password, confirmPassword, isMentor, phoneNumber } = ev.currentTarget.elements;
    if (password.value !== confirmPassword.value) {
      flashContext.set({ isError: true, message: 'Passwords do not match' });
      return;
    }

    api.auth
      .register({
        email: email.value,
        isMentor: isMentor.value,
        name: name.value,
        password: password.value,
        phoneNumber: phoneNumber.value,
      })
      .then(() => {
        flashContext.set({ message: 'you were successfuly registered' });
        navigate('/');
      })
      .catch((err: IApiError) => {
        if (err.response.status === 401) {
          flashContext.set({ isError: true, message: 'A user with that email already exists' });
        }
        console.error(err.response.status);
      });
  };

  return (
    <RegisterWrapper>
      <Heading>Create an Account!</Heading>
      <StyledForm onSubmit={handleSubmit}>
        <InputGroup>
          <label htmlFor="name">Full Name</label>
          <Input type="text" id="name" required={true} placeholder="Mary Jane" />
        </InputGroup>
        <InputGroup>
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" required={true} placeholder="hello@ksu.edu" />
        </InputGroup>
        <InputGroup>
          <label htmlFor="phoneNumber">Phone Number</label>
          <Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            required={true}
            placeholder="123-456-7890"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Password</label>
          <Input type="password" id="password" required={true} />
        </InputGroup>
        <InputGroup>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input type="password" id="confirmPassword" required={true} />
        </InputGroup>
        <FieldSetWrapper>
          <fieldset>
            <legend>Select a User Role</legend>
            <RoleInputs>
              <label htmlFor="isMentor">Student</label>
              <input type="radio" name="isMentor" value={0} id="studentInput" defaultChecked={true} />
              <label htmlFor="mentorInput">Mentor</label>
              <input type="radio" name="isMentor" value={1} id="mentorInput" />
            </RoleInputs>
          </fieldset>
        </FieldSetWrapper>
        <SubmitButton type="submit">Sign Up 🎉</SubmitButton>
      </StyledForm>
    </RegisterWrapper>
  );
};

export default Registration;

const RegisterWrapper = styled.div`
  padding: 2rem;
`;

const Heading = styled.h1`
  color: ${props => props.theme.primary};
  text-align: center;
  padding-bottom: 2rem;
`;

const StyledForm = styled.form`
  max-width: 60rem;
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

const FieldSetWrapper = styled.div`
  margin: 1rem 0 2rem;
  border-radius: 5px;

  legend {
    font-size: 2rem;
  }

  label,
  input {
    display: inline-block;
    width: auto;
    font-weight: 400;
    height: 3.2rem;
    line-height: 3.2rem;
  }
  input {
    margin-top: 0;
    vertical-align: middle;
    background: ${props => props.theme.black};
  }
`;

const RoleInputs = styled.div`
  padding-left: 1.5rem;
`;
