import * as React from 'react';
import styled from 'styled-components';

import { SubmitButton } from '../../styles/comp';
import * as api from '../../utils/api';
import CreateMeeting from './CreateMeeting';
import { IUser, IMentor } from '../../types';
import { RouteComponentProps } from '@reach/router';

interface IProps extends RouteComponentProps {
  mentorId?: string;
  user: IUser;
}

const Mentor: React.FC<IProps> = ({ mentorId = undefined }, user) => {
  const [mentor, setMentor] = React.useState<IMentor | undefined>(undefined);
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    api.mentors.get(mentorId).then((mentor: IMentor) => setMentor(mentor));
  }, []);

  if (mentor) {
    const { name, bio, avatar, rate, review, category, career } = mentor;
    return (
      <>
        <CreateMeeting open={modalOpen} mentor={mentor} user={user} close={() => setModalOpen(false)} />
        <PageWrapper>
          {name && (
            <>
              <Hero>
                <Left>
                  <PageHeading>{name}</PageHeading>
                  <OverallRating>Overall Rating: {review}</OverallRating>
                  <ProfilePicture src={avatar} />
                </Left>
                <Right>
                  <ScheduleMeeting onClick={() => setModalOpen(true)}>Schedule a Meeting!</ScheduleMeeting>
                  <RightWrapper>
                    <Rate>${rate}</Rate>
                    <Bio>{bio}</Bio>
                    <Info>
                      <InfoHeading>Area of Expertise:</InfoHeading>
                      <p>{category}</p>
                      <InfoHeading>Career:</InfoHeading>
                      <p> {career}</p>
                    </Info>
                  </RightWrapper>
                </Right>
              </Hero>
              <Reviews>
                <SubHeading>
                  {name}
                  's Reviews
                </SubHeading>
                <ReviewList>
                  <Review>
                    <Reviewer>Cathy Wendte</Reviewer>
                    <Rating> Rating: 10</Rating>
                    <Message>She was an unbelievable mentor!</Message>
                  </Review>
                  <Review>
                    <Reviewer>Caleb Setiawan</Reviewer>
                    <Rating> Rating: 10</Rating>
                    <Message>She spent so much time with me!</Message>
                  </Review>
                  <Review>
                    <Reviewer>Max Flint</Reviewer>
                    <Rating> Rating: 10</Rating>
                    <Message>I do not regret the money I spent at all!</Message>
                  </Review>
                </ReviewList>
              </Reviews>
            </>
          )}
        </PageWrapper>
      </>
    );
  }

  return null;
};

export default Mentor;

const PageWrapper = styled.div`
  max-width: 110rem;
  margin: 0 auto;
  padding: 4rem;
`;

const Hero = styled.div`
  padding-top: 1rem;
  display: flex;
  background: ${props => props.theme.lightGray};
  border-radius: 5px;
  padding: 2rem 4rem;
`;

const Left = styled.div``;
const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightWrapper = styled.div`
  padding: 7rem 0 2rem 4rem;
`;

const Rate = styled.p`
  font-size: 2.4rem;
  color: ${props => props.theme.green};
`;

const OverallRating = styled.p`
  font-size: 2rem;
  padding-bottom: 0.5rem;
`;

const PageHeading = styled.h1`
  color: ${props => props.theme.primary};
`;

const ProfilePicture = styled.img`
  width: 30rem;
  display: block;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
`;

const ScheduleMeeting = styled(SubmitButton)`
  flex: unset;
  align-self: flex-end;
  margin-top: 2rem;
  margin-right: 1rem;
`;

const Bio = styled.p``;

const Info = styled.div`
  padding-top: 2rem;
`;

const InfoHeading = styled.p`
  font-size: 2rem;
  color: ${props => props.theme.primary};
`;

const Reviews = styled.div``;

const SubHeading = styled.h2`
  color: ${props => props.theme.primary};
  padding: 2rem 0 0.5rem;
`;

const ReviewList = styled.ul`
  border-radius: 5px;
  overflow: hidden;
`;

const Review = styled.li`
  background: ${props => props.theme.gray};
  color: ${props => props.theme.white};
  padding: 0.7rem 2rem;
  &:nth-child(2n) {
    background: ${props => props.theme.primary};
  }
`;

const Reviewer = styled.span`
  font-size: 2rem;
`;

const Rating = styled.span``;

const Message = styled.p``;
