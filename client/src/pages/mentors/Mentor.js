import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SubmitButton } from 'styles/comp';
import * as api from 'utils/api';
import CreateMeeting from './CreateMeeting';

export default class Mentor extends Component {
  state = { modalOpen: false };

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { name, rate, career, reviews, bio } = this.props.mentor;
    return (
      <>
        <CreateMeeting open={this.state.modalOpen} mentor={this.props.mentor} close={this.closeModal} />
        <MentorWrapper>
          <p>{name}</p>
          {career && <p>{career}</p>}
          {rate && <p>{rate}</p>}
          {reviews && <p>{reviews}</p>}
          {bio && <p>{bio}</p>}
          <SubmitButton onClick={this.openModal}>Request a Meeting</SubmitButton>
        </MentorWrapper>
      </>
    );
  }
}
Mentor.propTypes = {
  mentor: PropTypes.object.isRequired,
};

const MentorWrapper = styled.div``;
