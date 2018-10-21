import React, { Component } from 'react';
import Input from 'components/Input';
import styled from 'styled-components';
import * as api from 'utils/api';
import MentorCard from './MentorCard';

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
        <SubHeading>Set Up a Meeting With one of these Mentors</SubHeading>
        {mentors && (
          <MentorsList>
            {mentors.map(mentor => (
              <MentorCard key={mentor._id} mentor={mentor} />
            ))}
          </MentorsList>
        )}
      </MentorsWrapper>
    );
  }
}

const MentorsWrapper = styled.div`
  padding: 2rem;
  max-width: 110rem;
  margin: 0 auto;
`;
const Heading = styled.h1`
  color: ${props => props.theme.gray};
  text-align: center;
  padding-bottom: 2rem;
`;

const SubHeading = styled.h2`
  padding-top: 2rem;
  color: ${props => props.theme.primary};
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
const MentorsList = styled.div``;
