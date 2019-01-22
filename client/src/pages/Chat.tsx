import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
// import FlashContext from '../contexts/FlashContext';
import { IUser, IMentor, IForm } from '../types';
import { PageWrapper, Heading, InputGroup, SubHeading, Link, P } from '../components/Elements';

interface IProps extends RouteComponentProps {
  user: IUser;
}

const socket = io('http://127.0.0.1:5000/api');

socket.on('test', (t: any) => {
  console.log('test ran' + t);
});

const Chat: React.FC<IProps> = ({ user }) => {
  // const flashContext = React.useContext(FlashContext);
  const [mentor, setMentor] = React.useState<IMentor | undefined>(undefined);

  const handleMentorSubmit = (e: React.FormEvent<HTMLFormElement> & IForm) => {
    e.preventDefault();
    const { mentor: inputMentor } = e.currentTarget.elements;
    setMentor(inputMentor.value as any);
  };
  const handleNameSubmit = (e: React.FormEvent<HTMLFormElement> & IForm) => {
    e.preventDefault();
    console.log('event submitted');
    const { name } = e.currentTarget.elements;

    console.log(socket);
    socket.emit('userJoin', name.value);
  };

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement> & IForm) => {
    e.preventDefault();
    const { message } = e.currentTarget.elements;
    socket.emit('messageSent', message.value);
  };
  return true ? (
    <PageWrapper>
      <Heading>Welcome to chat</Heading>
      <form onSubmit={handleNameSubmit}>
        <InputGroup>
          <label htmlFor="name">What is your name?</label>
          <input type="text" id="name" autoFocus={true} />
        </InputGroup>
      </form>
      <form onSubmit={handleMentorSubmit}>
        <InputGroup>
          <label htmlFor="mentor">Who would you like to chat with?</label>
          <input type="text" id="mentor" autoFocus={true} />
        </InputGroup>
      </form>
      {name && (
        <form onSubmit={handleMessageSubmit}>
          <SubHeading>You are chatting with {mentor}</SubHeading>
          <InputGroup>
            <label htmlFor="message">Enter your message below</label>
            <textarea id="message" />
          </InputGroup>
          <Messages />
          <Hi />
        </form>
      )}
    </PageWrapper>
  ) : (
    <CustomP>
      You must be signed in to chat. Please go to <Link to="/login">the login page</Link>
    </CustomP>
  );
};

export default Chat;

const Hi = styled.div``;
const Messages = styled.div`
  background: ${props => props.theme.gray};
`;
const CustomP = styled(P)`
  margin: 8rem 0;
  text-align: center;
`;
