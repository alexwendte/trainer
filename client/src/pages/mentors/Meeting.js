import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as api from 'utils/api';
import { SubmitButton } from 'styles/comp';

export default class Meeting extends Component {
  state = {
    deleted: false,
    student: null,
    mentor: null,
  };

  async componentDidMount() {
    console.log(this.props.meeting);
    const { studentID, mentorID } = this.props.meeting;
    const studentPromise = api.users.get(studentID._id);
    const mentorPromise = api.users.get(mentorID._id);

    const [student, mentor] = await Promise.all([studentPromise, mentorPromise]);

    console.log(student, mentor);

    this.setState({ student, mentor });
  }

  handleStatusChange = async ({ status }) => {
    await api.meetings.update(this.props.meeting._id, { isAccepted: status });
  };

  handleDelete = async () => {
    await api.meetings.delete(this.props.meeting._id);
    this.setState({ deleted: true });
  };

  render() {
    const { meeting, isMentor } = this.props;
    const { student, mentor } = this.state;
    console.log(meeting);
    const { deleted } = this.state;
    if (deleted) return null;
    return (
      <MeetingWrapper>
        <p>{meeting.title}</p>
        <p>{new Date(meeting.meetingDate).toDateString()}</p>
        {isMentor
          && student && (
            <div>
              <p>{student.email}</p>
              <p>{student.phoneNumber}</p>
            </div>
          )}

        {isMentor
          && !meeting.isAccepted && (
            <SubmitButton
              onClick={() => {
                this.handleStatusChange({ status: true });
              }}
            >
              Accept Meeting
            </SubmitButton>
          )}
        {isMentor
          && meeting.isAccepted && (
            <SubmitButton
              onClick={() => {
                this.handleStatusChange({ status: false });
              }}
            >
              Reject Meeting
            </SubmitButton>
          )}
        {!isMentor
          && mentor && (
            <div>
              <p>{mentor.email}</p>
              <p>{mentor.phoneNumber}</p>
            </div>
          )}
        {!isMentor && (
          <SubmitButton
            onClick={() => {
              this.handleDelete();
            }}
          >
            Delete Meeting
          </SubmitButton>
        )}
      </MeetingWrapper>
    );
  }
}
Meeting.propTypes = {
  meeting: PropTypes.object.isRequired,
  isMentor: PropTypes.bool.isRequired,
};

const MeetingWrapper = styled.div`
  display: grid;
  padding: 1.5rem
  grid-template-columns: repeat(4, 1fr);
`;
