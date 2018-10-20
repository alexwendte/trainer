import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class Mentor extends Component {
  render() {
    const { _id, name, rate, career, reviews, bio } = this.props.mentor;
    return (
      <MentorWrapper>
        <p>{name}</p>
        {career && <p>{career}</p>}
        {rate && <p>{rate}</p>}
        {reviews && <p>{reviews}</p>}
        {bio && <p>{bio}</p>}
      </MentorWrapper>
    );
  }
}
Mentor.propTypes = {
  mentor: PropTypes.object.isRequired,
};

const MentorWrapper = styled.div``;
