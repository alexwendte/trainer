import React, { Component } from 'react';
import Input from 'components/Input';
import styled from 'styled-components';
import * as api from 'utils/api';
import Flash from 'components/Flash';
import { navigate } from '@reach/router';

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
      }, 2000);
    }
    if (error) {
      setTimeout(() => {
        this.setState({ submitted: false, error: '' });
      }, 2000);
    }
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const { name, email, password, confirmPassword, isMentor } = ev.currentTarget.elements;
    if (password.value !== confirmPassword.value) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }
    api.auth
      .register({
        name: name.value,
        email: email.value,
        password: password.value,
        isMentor: isMentor.value,
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
              <Input type="name" id="name" required />
            </InputGroup>
            <InputGroup>
              <label htmlFor="email">Email</label>
              <Input type="email" id="email" required />
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
                  <label htmlFor="incomeInput">Mentor</label>
                  <input type="radio" name="isMentor" value id="mentorInput" />
                </RoleInputs>
              </fieldset>
            </FieldSetWrapper>
            <SubmitButton type="submit">Create</SubmitButton>
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

const SubmitButton = styled.button`
  border-radius: 5px;
  color: ${props => props.theme.white};
  background: ${props => props.theme.primary};
  border: none;
  padding: 1rem 1.5rem;
  font-weight: 600;
  font-size: 1.8rem;
  transition: all 0.3s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  display: inline-block;
  flex: 0;
  align-self: center;
  &:hover {
    transform: translateY(-1px);
    transition: all 0.15s cubic-bezier(0.895, 0.03, 0.685, 0.22);
    cursor: pointer;
  }
`;
