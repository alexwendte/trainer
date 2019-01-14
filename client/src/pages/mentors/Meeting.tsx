import * as React from 'react';
import styled from 'styled-components';
import { SubmitButton } from '../../styles/comp';
import * as api from '../../utils/api';
import {IMentor, IFullUser, IMeeting} from '../../types';

interface IProps {
  meeting: IMeeting,
  isMentor: boolean
}

const Meeting: React.FC<IProps> = ({ meeting, isMentor}) => {
  const [deleted, setDeleted] =  React.useState<boolean>(false);
  const [student, setStudent] = React.useState<IFullUser | undefined>(undefined);
  const [mentor, setMentor] = React.useState<IMentor | undefined>(undefined);

  React.useEffect(()=> {
    (async () => {
      const {meetingStudent, meetingMentor} = meeting
      const studentPromise = api.users.get(meetingStudent._id)
      const mentorPromise = api.users.get(meetingMentor._id)
      const [student, mentor] = await Promise.all([studentPromise, mentorPromise]);

      setStudent(student);
      setMentor(mentor);
    })
  })

  const handleStatusChange = async ({ status }: {status: boolean}) => {
    await api.meetings.update(meeting._id, { isAccepted: status });
  };

  const handleDelete = async () => {
    await api.meetings.delete(meeting._id);
    setDeleted(true);
  };

  if (deleted) return null;
  return (
    <MeetingWrapper>
      <p>{meeting.title}</p>
      <p>{new Date(meeting.meetingDate).toDateString()}</p>
      {isMentor && student && (
        <div>
          <p>{student.email}</p>
          <p>{student.phoneNumber}</p>
        </div>
      )}

      {isMentor && !meeting.isAccepted && (
        <SubmitButton
          onClick={() => {
            handleStatusChange({ status: true });
          }}
        >
          Accept Meeting
        </SubmitButton>
      )}
      {isMentor && meeting.isAccepted && (
        <SubmitButton
          onClick={() => {
            handleStatusChange({ status: false });
          }}
        >
          Reject Meeting
        </SubmitButton>
      )}
      {!isMentor && mentor && (
        <div>
          <p>{mentor.email}</p>
          <p>{mentor.phoneNumber}</p>
        </div>
      )}
      {!isMentor && (
        <SubmitButton
          onClick={() => {
            handleDelete();
          }}
        >
          Delete Meeting
        </SubmitButton>
      )}
    </MeetingWrapper>
  );
}

export default Meeting

const MeetingWrapper = styled.div`
  display: grid;
  padding: 1.5rem
  grid-template-columns: repeat(4, 1fr);
`;
