import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring';
import PropTypes from 'prop-types';

class Flash extends React.Component {
  static defaultProps = {
    error: null,
    successMessage: '',
    fixed: false,
  };

  render() {
    const { successMessage, error, submitted, fixed } = this.props;
    return (
      <>
        <Transition
          from={{ opacity: 0, height: 0 }}
          enter={{ opacity: 1, height: 'auto' }}
          leave={{ opacity: 0, height: 0 }}
        >
          {submitted
            && !error
            && successMessage.length > 0
            // eslint-disable-next-line
            && (({ opacity, height }) => (
              <ResponseSuccess data-testid="create-error" className={fixed ? 'fixed' : ''} style={{ opacity, height }}>
                <Message>{successMessage}</Message>
              </ResponseSuccess>
            ))}
        </Transition>
        <Transition
          from={{ opacity: 0, height: 0 }}
          enter={{ opacity: 1, height: 'auto' }}
          leave={{ opacity: 0, height: 0 }}
        >
          {error
            // eslint-disable-next-line
            && (({ opacity, height }) => (
              <ResponseError data-testid="create-error" className={fixed ? 'fixed' : ''} style={{ opacity, height }}>
                <Message>{error}</Message>
              </ResponseError>
            ))}
        </Transition>
      </>
    );
  }
}

Flash.propTypes = {
  error: PropTypes.string,
  submitted: PropTypes.bool.isRequired,
  successMessage: PropTypes.string,
  fixed: PropTypes.bool,
};

export default Flash;

const Message = styled.h3`
  padding: 0.5rem 2rem;
  text-align: center;
  color: white;
  font-size: 2rem;
  position: relative;
`;

const ResponseSuccess = styled.div`
  background: ${props => props.theme.green};
  &.fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
  }
`;
const ResponseError = styled.div`
  background: ${props => props.theme.warning};
  &.fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
  }
`;
