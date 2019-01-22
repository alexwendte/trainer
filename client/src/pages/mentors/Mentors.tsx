import * as React from 'react';
import styled from 'styled-components';
import { SubmitButton } from '../../styles/comp';
import { IMentor } from '../../types';
import * as api from '../../utils/api';
import MentorCard from './MentorCard';
import { RouteComponentProps } from '@reach/router';
import { Link } from '../../components/Elements';

type SortTypes = 'review' | 'lowest' | 'highest';

const Mentors: React.FC<RouteComponentProps> = () => {
  const [currentSortStrategy, setCurrentSortStrategy] = React.useState<SortTypes>('review');
  const [mentors, setMentors] = React.useState<IMentor[]>([]);
  const [sortedMentors, setSortedMentors] = React.useState<IMentor[]>([]);

  React.useEffect(() => {
    api.mentors.get().then((apiMentors: IMentor[]) => {
      setMentors(apiMentors);
      sort({ type: 'review', mentorsToSort: apiMentors });
    });
  }, []);

  const handleCategoryChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.currentTarget;

    const newSortedMentors = mentors.filter(
      mentor => mentor.category && mentor.category.toLowerCase().includes(value.toLowerCase())
    );
    setSortedMentors(newSortedMentors);
  };

  const sort = ({ type, mentorsToSort }: { type: SortTypes; mentorsToSort?: IMentor[] }) => {
    const newMentors = (mentorsToSort || mentors).sort((prev, next) => {
      switch (type) {
        case 'review':
          if (!prev.review) return 1;
          if (prev.review < next.review) return 1;
          return -1;

        case 'lowest':
          if (prev.rate >= next.rate) return 1;
          return -1;

        case 'highest':
          if (prev.rate <= next.rate) return 1;
          return -1;

        default:
          return 1;
      }
    });
    setSortedMentors(newMentors);
    setCurrentSortStrategy(type);
    return { sortedMentors: newMentors, currentSortStrategy: type };
  };

  return (
    <MentorsWrapper>
      <Heading>
        Let's Find You a Mentor!<Link to="/chat">Chat with one!</Link>
      </Heading>

      {mentors.length > 0 && (
        <>
          <InputGroup>
            <SubHeading id="category">Filter by a Specialty</SubHeading>
            <CategoryInput type="text" onChange={handleCategoryChange} id="category" placeholder="React.js" />
          </InputGroup>
          <Sort>
            <SubHeading>Order By 👇</SubHeading>
            <SortButtons>
              <SortButton
                className={currentSortStrategy === 'review' ? 'active' : ''}
                onClick={() => sort({ type: 'review' })}
              >
                Rating
              </SortButton>
              <SortButton
                className={currentSortStrategy === 'lowest' ? 'active' : ''}
                onClick={() => sort({ type: 'lowest' })}
              >
                Lowest Per Meeting
              </SortButton>
              <SortButton
                className={currentSortStrategy === 'highest' ? 'active' : ''}
                onClick={() => sort({ type: 'highest' })}
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
};

export default Mentors;

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
