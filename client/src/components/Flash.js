import * as React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring';

const Flash = ({ submitted, error }) => (
  <>
    <Transition
      from={{ transform: 'translateY(-100%)' }}
      enter={{ transform: 'translateY(0)' }}
      leave={{ transform: 'translateY(-100%)' }}
    >
      {submitted
        && !error
        // eslint-disable-next-line
        && (({ transform }) => <ResponseSuccess style={{ transform }}>Transaction Created Successfully</ResponseSuccess>)}
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
