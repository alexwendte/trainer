import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as api from 'utils/api';
import { SubmitButton } from 'styles/comp';

export default class Meeting extends Component {
  handleStatusChange = async ({ status }) => {
    // call update api
    const rest = await api.meetings.update(this.props.meeting._id, { isAccepted: status });
    console.log(rest);
  };

  render() {
    const { meeting } = this.props;
    return (
      <MeetingWrapper>
        <p>{meeting.title}</p>
        {!meeting.isAccepted && (
          <SubmitButton
            onClick={() => {
              this.handleStatusChange({ status: true });
            }}
          >
            Accept Meeting
          </SubmitButton>
        )}
        {meeting.isAccepted && (
          <SubmitButton
            onClick={() => {
              this.handleStatusChange({ status: false });
            }}
          >
            Reject Meeting
          </SubmitButton>
        )}
      </MeetingWrapper>
    );
  }
}
Meeting.propTypes = {
  meeting: PropTypes.object.isRequired,
};

const MeetingWrapper = styled.div``;
