import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { transition, elevation } from 'utils/mixins';
import { Link } from '@reach/router';

export default class MentorCard extends Component {
  render() {
    const { _id, name, rate, career, review, category, avatar } = this.props.mentor;
    return (
      <MentorCardWrapper>
        <Heading>{name}</Heading>
        <Picture src={avatar} />
        <Content>
          {review && <p>Rating: {review}</p>}
          {rate && (
            <p>
              Price Per Meeting: <Rate>${rate}</Rate>
            </p>
          )}
          {category && <p>Specialty: {category}</p>}
          {career && <p>Career: {career}</p>}
        </Content>
        <ViewProfile style={{ flex: 'unset', marginTop: '1rem', alignSelf: 'center' }} to={`/mentors/${_id}`}>
          View Profile
        </ViewProfile>
      </MentorCardWrapper>
    );
  }
}
MentorCard.propTypes = {
  mentor: PropTypes.object.isRequired,
};

const MentorCardWrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  text-align: center;
  padding: 1.5rem;
  margin: 0 2rem 3rem;
  border-radius: 5px;
  width: 28rem;
  ${elevation({ level: 4 })};
  ${transition({ name: 'easeOutCubic', prop: 'all', time: 0.3 })};

  &:hover {
    transform: rotate(1deg) translateX(-10px) translateY(-10px);
    ${transition({ name: 'easeInCubic', prop: 'all', time: 0.2 })};
  }
`;

const Content = styled.div`
  padding-left: 3rem;
  p {
    text-align: left;
  }
`;

const Heading = styled.h4`
  color: ${props => props.theme.primary};
  padding-bottom: 1.5rem;
  font-size: 2rem;
  align-self: center;
`;

const Picture = styled.img`
  display: block;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
  height: 18rem;
  width: 22rem;
  align-self: center;
  margin-bottom: 1.5rem;
`;

const ViewProfile = styled(Link)`
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
`;

const Rate = styled.span`
  color: ${props => props.theme.green};
`;
