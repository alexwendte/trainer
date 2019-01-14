import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { Transition } from 'react-spring';
import styled from 'styled-components/macro';
import FlashContext from './contexts/FlashContext';

const Flash: React.FC<RouteComponentProps> = () => {
  const context = React.useContext(FlashContext);
  return (
    <>
      <Transition
        from={{ opacity: 0, height: 0 }}
        enter={{ opacity: 1, height: 'auto' }}
        items={!context.isError && context.message}
        leave={{ opacity: 0, height: 0 }}
      >
        {(toggle: any) =>
          toggle &&
          (({ opacity, height }: { opacity: number; height: number }) => (
            <ResponseSuccess data-testid="create-success" style={{ opacity, height }}>
              <Message>{context.message}</Message>
            </ResponseSuccess>
          ))
        }
      </Transition>
      <Transition
        from={{ opacity: 0, height: 0 }}
        enter={{ opacity: 1, height: 'auto' }}
        leave={{ opacity: 0, height: 0 }}
        items={context.isError && context.message}
      >
        {(toggle: any) =>
          toggle &&
          (({ opacity, height }: { opacity: number; height: number }) => (
            <ResponseError data-testid="create-error" style={{ opacity, height }}>
              <Message>{context.message}</Message>
              <Close onClick={context.reset}>X</Close>
            </ResponseError>
          ))
        }
      </Transition>
    </>
  );
};

export default Flash;

const Message = styled.h3`
  font-size: 1.8rem;
  position: relative;
  text-align: center;
`;

const Response = styled.div`
  padding: 2rem;
  position: fixed;
  margin: 0 auto;
  top: 7.6rem;
  left: 24rem;
  right: 0;
  z-index: 2000;
  background: ${props => props.theme.white};
  max-width: 60rem;
  border-radius: 5px;
`;

const Close = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.black};
  font-size: 1.6rem;
  font-weight: 900;
  position: absolute;
  top: 5px;
  right: 7px;
  &:hover {
    cursor: pointer;
  }
`;

const ResponseSuccess = styled(Response)`
  border: 5px solid ${props => props.theme.success};
`;
const ResponseError = styled(Response)`
  border: 5px solid ${props => props.theme.warning};
`;
