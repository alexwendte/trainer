import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as api from 'utils/api';
import { SubmitButton } from 'styles/comp';

export default class Meeting extends Component {
  state = {
    deleted: false,
  };

  handleStatusChange = async ({ status }) => {
    await api.meetings.update(this.props.meeting._id, { isAccepted: status });
  };

  handleDelete = async () => {
    await api.meetings.delete(this.props.meeting._id);
    this.setState({ deleted: true });
  };

  render() {
    const { meeting, isMentor } = this.props;
    console.log(meeting);
    const { deleted } = this.state;
    if (deleted) return null;
    return (
      <MeetingWrapper>
        <p>{meeting.title}</p>
        <p>{new Date(meeting.meetingDate).toDateString()}</p>
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
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  button {
    flex: unset;
  }
`;
