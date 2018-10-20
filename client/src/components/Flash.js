import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring';
import PropTypes from 'prop-types';

class Flash extends React.Component {
  static defaultProps = {
    error: null,
    successMessage: '',
  };

  render() {
    const { successMessage, error, submitted } = this.props;
    return (
      <>
        <Transition
          from={{ transform: 'translateY(-100%)' }}
          enter={{ transform: 'translateY(0)' }}
          leave={{ transform: 'translateY(-100%)' }}
        >
          {submitted
            && !error
            && successMessage.length > 0
            // eslint-disable-next-line
            && (({ transform }) => <ResponseSuccess style={{ transform }}>{successMessage}</ResponseSuccess>)}
        </Transition>
        <Transition
          from={{ transform: 'translateY(-100%)' }}
          enter={{ transform: 'translateY(0)' }}
          leave={{ transform: 'translateY(-100%)' }}
        >
          {error
            // eslint-disable-next-line
            && (({ transform }) => (
              <ResponseError data-testid="create-error" style={{ transform }}>
                {error}
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
};

export default Flash;

const Response = styled.h3`
  text-align: center;
  padding: 0.5rem;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 1.6rem;
`;
const ResponseSuccess = styled(Response)`
  background: ${props => props.theme.green};
`;
const ResponseError = styled(Response)`
  background: ${props => props.theme.warning};
`;
