import React, { Component } from 'react';
import Input from 'components/Input';
import styled from 'styled-components';
import Flash from 'components/Flash';
import PropTypes from 'prop-types';

export default class Login extends Component {
  state = {
    error: null,
    submitted: false,
  };

  componentDidUpdate() {
    const { error } = this.state;
    if (error) {
      setTimeout(() => {
        this.setState({ error: '' });
      }, 2000);
    }
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const { email, password } = ev.currentTarget.elements;
    this.props
      .login({
        email: email.value,
        password: password.value,
      })
      .catch(err => {
        console.error(err);
        if (err.response.status === 401) {
          this.setState({ error: 'Incorrect Email or Password', submitted: true });
        }
      });
  };

  render() {
    const { submitted, error } = this.state;
    return (
      <>
        <Flash submitted={submitted} error={error} successMessage="" />
        <RegisterWrapper>
          <Heading>
            Login{' '}
            <span role="img" aria-label="Thumbs up">
              👍
            </span>
          </Heading>
          <StyledForm onSubmit={this.handleSubmit}>
            <InputGroup>
              <label htmlFor="email">Email</label>
              <Input type="email" id="email" required />
            </InputGroup>
            <InputGroup>
              <label htmlFor="password">Password</label>
              <Input type="password" id="password" required />
            </InputGroup>
            <SubmitButton type="submit">Log In!</SubmitButton>
          </StyledForm>
        </RegisterWrapper>
      </>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

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
