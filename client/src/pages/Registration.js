import React, { Component } from 'react';
import Input from 'components/Input';
import styled from 'styled-components';
import * as api from 'utils/api';
import Flash from 'components/Flash';
import { navigate } from '@reach/router';
import { SubmitButton } from 'styles/comp';

export default class Registration extends Component {
  state = {
    error: null,
    submitted: false,
  };

  componentDidUpdate() {
    const { submitted, error } = this.state;
    if (submitted && !error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    if (error) {
      setTimeout(() => {
        this.setState({ submitted: false, error: '' });
      }, 3000);
    }
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const { name, email, password, confirmPassword, isMentor, phoneNumber } = ev.currentTarget.elements;
    if (password.value !== confirmPassword.value) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }

    console.dir(phoneNumber);

    api.auth
      .register({
        name: name.value,
        email: email.value,
        password: password.value,
        isMentor: isMentor.value,
        phoneNumber: phoneNumber.value,
      })
      .then(() => this.setState({ submitted: true }))
      .catch(err => {
        if (err.response.status === 401) {
          this.setState({ error: 'A user with that email already exists' });
        }
        console.error(err.response.status);
      });
  };

  render() {
    const { submitted, error } = this.state;
    return (
      <>
        <Flash submitted={submitted} error={error} successMessage="You Registered Successfully! 👍" />
        <RegisterWrapper>
          <Heading>Create an Account!</Heading>
          <StyledForm onSubmit={this.handleSubmit}>
            <InputGroup>
              <label htmlFor="name">Full Name</label>
              <Input type="text" id="name" required placeholder="Mary Jane" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="email">Email</label>
              <Input type="email" id="email" required placeholder="hello@ksu.edu" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="phoneNumber">Phone Number</label>
              <Input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                placeholder="123-456-7890"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="password">Password</label>
              <Input type="password" id="password" required />
            </InputGroup>
            <InputGroup>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input type="password" id="confirmPassword" required />
            </InputGroup>
            <FieldSetWrapper>
              <fieldset>
                <legend>Select a User Role</legend>
                <RoleInputs>
                  <label htmlFor="isMentor">Student</label>
                  <input type="radio" name="isMentor" value={false} id="studentInput" defaultChecked />
                  <label htmlFor="mentorInput">Mentor</label>
                  <input type="radio" name="isMentor" value id="mentorInput" />
                </RoleInputs>
              </fieldset>
            </FieldSetWrapper>
            <SubmitButton type="submit">Sign Up 🎉</SubmitButton>
          </StyledForm>
        </RegisterWrapper>
      </>
    );
  }
}

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
