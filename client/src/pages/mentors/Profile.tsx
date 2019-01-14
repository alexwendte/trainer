import { Link, navigate } from '@reach/router';
import * as React from 'react';
import styled from 'styled-components';

import { SubmitButton } from '../../styles/comp';
import * as api from '../../utils/api';
import TextArea from '../../components/TextArea';
import AmountInput from '../../components/AmountInput';
import FlashContext from '../../contexts/FlashContext';
import Input from '../../components/Input';
import Meeting from './Meeting';
import {IUser, IForm, IMentor, IMeeting} from '../../types'

interface IProps {
  user: IUser
}

const Profile: React.FC<IProps> = ({user}) =>  {
  const [fullUser, setFullUser] = React.useState<IMentor | undefined>(undefined)
  const [meetings, setMeetings] = React.useState<IMeeting[]>([])

  const flashContext = React.useContext(FlashContext)

React.useEffect(() => {
  (async () => {
    const userPromise = api.users.get(user._id);
    const meetingsPromise = api.meetings.get();
    const [fullUser, meetings] = await Promise.all([userPromise, meetingsPromise]);
    setFullUser(fullUser)
    setMeetings(meetings)
  })()
})

 const handleSubmit = async (ev: React.FormEvent<HTMLFormElement> & IForm) => {
    ev.preventDefault();
    const {
      name,
      email,
      phoneNumber,
      currentPassword,
      // password,
      // confirmPassword,
      bio,
      rate: dirtyRate,
      career,
      avatar,
      // isMentor,
      category,
    } = ev.currentTarget.elements;

    let rate;
    if (dirtyRate) {
      const stringRate = dirtyRate.value.toString();
      rate = stringRate.includes('$') ? stringRate.substr(1) : stringRate;
    }

    try {
      await api.auth.verify({ email: fullUser ? fullUser.email : '', password: currentPassword.value });
    } catch (error) {
      flashContext.set({message: 'The current password you entered is incorrect', isError: true})
      return;
    }

    api.users
      .update(user._id, {
        career: career.value,
        bio: bio.value,
        rate,
        category: category && category.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        name: name.value,
        avatar: avatar.value,
      })
      .then(() => {
        flashContext.set({message: 'Your Profile Was Modified ⚡'})
      navigate('/')
    });
  };

    if(fullUser) {
      const { name, email, career, category, rate, bio, isMentor, phoneNumber, avatar } = fullUser;
      return (
          <RegisterWrapper>
            <Heading>Modify Your Profile</Heading>
            <StyledForm onSubmit={handleSubmit}>
              <InputGroup>
                <label htmlFor="name">Full Name</label>
                <Input type="name" id="name" value={name} />
              </InputGroup>
              <InputGroup>
                <label htmlFor="email">Email</label>
                <Input type="email" id="email" value={email} />
              </InputGroup>
              <InputGroup>
                <label htmlFor="phoneNumber">Phone Number</label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required={true}
                  value={phoneNumber}
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                />
              </InputGroup>
              <InputGroup>
                <label htmlFor="career">Career</label>
                <Input type="text" id="career" value={career} />
              </InputGroup>
              <InputGroup>
                <label htmlFor="avatar">Avatar</label>
                <Input type="text" id="avatar" value={avatar} />
              </InputGroup>
              {isMentor && (
                <>
                  <InputGroup>
                    <label htmlFor="category">Specialty</label>
                    <Input type="text" id="category" value={category} />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="rate">Rate Per Meeting</label>
                    <AmountInput type="text" id="rate" value={rate ? `$${rate}` : ''} />
                  </InputGroup>
                </>
              )}
              <InputGroup>
                <label htmlFor="bio">Biography</label>
                <TextArea id="bio" value={bio} />
              </InputGroup>
              <InputGroup>
                <label htmlFor="currentPassword">
                  Current Password <Required>Required</Required>
                </label>
                <Input type="password" id="currentPassword" required={true} />
              </InputGroup>
              {/* <InputGroup>
                <label htmlFor="password">New Password</label>
                <Input type="password" id="password" />
              </InputGroup>
              <InputGroup>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input type="password" id="confirmPassword" />
              </InputGroup> */}
              {/* <FieldSetWrapper>
                <fieldset>
                  <legend>Select a User Role</legend>
                  <RoleInputs>
                    <label htmlFor="isMentor">Student</label>
                    <input
                      type="radio"
                      name="isMentor"
                      checked={!isMentor}
                      onChange={handleRoleChange}
                      id="studentInput"
                    />
                    <label htmlFor="incomeInput">Mentor</label>
                    <input
                      type="radio"
                      name="isMentor"
                      checked={isMentor}
                      onChange={handleRoleChange}
                      id="mentorInput"
                    />
                  </RoleInputs>
                </fieldset>
              </FieldSetWrapper> */}
              <SubmitButton style={{ marginTop: '1.5rem', marginBottom: '3rem' }} type="submit">
                Modify My Information 👉
              </SubmitButton>
            </StyledForm>
            <Meetings>
              <Heading>Meetings</Heading>
              {meetings.length < 1 ? (
                <div>
                  <SubHeading>No Meetings, Get One Started 😀</SubHeading>
                  <MyLink to="/">GOGOGO</MyLink>
                </div>
              ) : (
                <>
                  <Headers>
                    <span>Title</span>
                    <span className="date">Date</span>
                    <span className="contact">Contact Info</span>
                    <div />
                  </Headers>
                  {meetings.map(meeting => (
                    <Meeting key={meeting._id} meeting={meeting} isMentor={isMentor} />
                  ))}
                </>
              )}
            </Meetings>
          </RegisterWrapper>
        )}
    return null
  }

export default Profile

const RegisterWrapper = styled.div`
  padding: 2rem;
`;

const Heading = styled.h1`
  color: ${props => props.theme.primary};
  text-align: center;
  padding-bottom: 2rem;
`;

const SubHeading = styled.h3`
  color: ${props => props.theme.gray};
  display: inline-block;
  margin-right: 3rem;
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
  input,
  textarea {
    width: 100%;
    border-radius: 5px;
    padding: 0.7rem 1.2rem;
    height: 3.4rem;
    border: none;
    background: ${props => props.theme.lightGrey};
  }
  textarea {
    height: 6rem;
  }
`;

const MyLink = styled(Link)`
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
  display: inline-block;
`;
/* 
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
`; */

const Required = styled.span`
  color: ${props => props.theme.warning};
  font-weight: bold;
`;

const Meetings = styled.div`
  padding-top: 6rem;
  max-width: 80rem;
  margin: 0 auto;
  padding-bottom: 3rem;
`;

const Headers = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  span {
    font-size: 2rem;
    font-weight: bold;
  }
`;
