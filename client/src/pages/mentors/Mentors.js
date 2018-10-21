import React, { Component } from 'react';
import Input from 'components/Input';
import styled from 'styled-components';
import * as api from 'utils/api';
import Mentor from './Mentor';

export default class Mentors extends Component {
  state = {
    mentors: null,
  };

  async componentDidMount() {
    const mentors = await api.mentors.get();
    this.setState({ mentors });
  }

  render() {
    const { mentors } = this.state;
    return (
      <MentorsWrapper>
        <Heading>Let's Find You a Mentor!</Heading>
        <InputGroup>
          <label htmlFor="category">Choose a Category</label>
          <Input type="category" id="category" placeholder="React.js" />
        </InputGroup>
        {mentors && (
          <MentorsList>
            {mentors.map(mentor => (
              <Mentor key={mentor._id} mentor={mentor} />
            ))}
          </MentorsList>
        )}
      </MentorsWrapper>
    );
  }
}

const Heading = styled.h1`
  color: ${props => props.theme.gray};
  text-align: center;
  padding-bottom: 2rem;
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

const MentorsWrapper = styled.div`
  padding: 2rem;
`;
const MentorsList = styled.div``;
