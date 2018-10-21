import React, { Component } from 'react';
import styled from 'styled-components';
import * as api from 'utils/api';
import { SubmitButton } from 'styles/comp';
import MentorCard from './MentorCard';

export default class Mentors extends Component {
  state = {
    // eslint-disable-next-line
    mentors: null,
    sortedMentors: null,
    currentSortStrategy: 'review',
  };

  async componentDidMount() {
    const mentors = await api.mentors.get();
    // eslint-disable-next-line
    this.setState({ mentors, sortedMentors: mentors });
    this.sort({ type: 'review' });
  }

  handleCategoryChange = ev => {
    const { value } = ev.currentTarget;

    this.setState(state => {
      const newMentors = state.mentors.filter(
        mentor => mentor.category && mentor.category.toLowerCase().includes(value.toLowerCase())
      );
      return { sortedMentors: newMentors };
    });
  };

  sort = ({ type }) => {
    this.setState(state => {
      const newMentors = state.sortedMentors.sort((prev, next) => {
        if (type === 'review') {
          if (!prev.review) return 1;
          if (prev.review < next.review) return 1;
          return -1;
        }
        if (type === 'lowest') {
          if (prev.rate >= next.rate) return 1;
          return -1;
        }
        if (type === 'highest') {
          if (prev.rate <= next.rate) return 1;
          return -1;
        }
      });
      return { sortedMentors: newMentors, currentSortStrategy: type };
    });
  };

  render() {
    const { sortedMentors, currentSortStrategy } = this.state;
    return (
      <MentorsWrapper>
        <Heading>Let's Find You a Mentor!</Heading>
        {sortedMentors && (
          <>
            <InputGroup>
              <SubHeading htmlFor="category">Filter by a Specialty</SubHeading>
              <CategoryInput type="text" onChange={this.handleCategoryChange} id="category" placeholder="React.js" />
            </InputGroup>
            <Sort>
              <SubHeading>Order By 👇</SubHeading>
              <SortButtons>
                <SortButton
                  className={currentSortStrategy === 'review' ? 'active' : ''}
                  onClick={() => this.sort({ type: 'review' })}
                >
                  Rating
                </SortButton>
                <SortButton
                  className={currentSortStrategy === 'lowest' ? 'active' : ''}
                  onClick={() => this.sort({ type: 'lowest' })}
                >
                  Lowest Per Meeting
                </SortButton>
                <SortButton
                  className={currentSortStrategy === 'highest' ? 'active' : ''}
                  onClick={() => this.sort({ type: 'highest' })}
                >
                  Highest Per Meeting
                </SortButton>
              </SortButtons>
            </Sort>
            <SetUp>View A Mentors Profile</SetUp>

            <MentorsList>
              {sortedMentors.map(mentor => (
                <MentorCard key={mentor._id} mentor={mentor} />
              ))}
            </MentorsList>
          </>
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
  padding: 1rem 0;
  color: ${props => props.theme.primary};
`;

const CategoryInput = styled.input`
  width: 50rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
  flex-grow: 1;
  display: inline-block;
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
    border-radius: 5px;
    padding: 0.7rem 1.2rem;
    height: 3.4rem;
    border: none;
    background: ${props => props.theme.lightGrey};
  }
`;
const MentorsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
`;

const Sort = styled.div`
  display: inline-block;
  margin-left: 4rem;
`;

const SortButtons = styled.div`
  display: flex;
  width: 50rem;
  justify-content: space-between;
`;

const SortButton = styled(SubmitButton)`
  background: ${props => props.theme.gray};
  flex: unset;
  &.active {
    background: ${props => props.theme.primary};
  }
`;

const SetUp = styled.h2`
  color: ${props => props.theme.primary};
  text-align: center;
  padding: 5rem 0 3rem;
`;
