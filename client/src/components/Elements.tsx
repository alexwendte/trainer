import { Link as UnstyledLink } from '@reach/router';
import * as React from 'react';
import styled from 'styled-components/macro';
import { elevation, transition } from '../utils/mixins';

export const InputGroup = styled.div`
  margin: 0 0 1.2rem;
  flex-grow: 1;
  label,
  legend {
    color: ${props => props.theme.primaryGrey};
    padding-bottom: 0.4rem;
  }
  label,
  input {
    display: block;
  }
  input,
  select,
  textarea {
    width: 100%;
    border-radius: 5px;
    padding: 0.9rem 1.5rem;
    border: none;
    background: ${props => props.theme.primaryBackground};
  }
`;
export const PageWrapper = styled.div`
  padding: 0 2rem 2rem;
  max-width: 140rem;
  margin: 0 auto;
`;
export const Heading = styled.h1`
  color: ${props => props.theme.primaryBlack};
  padding: 3.2rem 0;
  text-align: center;
  line-height: 1.2;
`;
export const SubHeading = styled.h2`
  color: ${props => props.theme.primaryBlack};
  padding: 2.4rem 0;
  text-align: center;
  line-height: 1.2;
`;
export const Button: any = styled.button`
  border-radius: 5px;
  color: ${props => props.theme.white};
  background: ${props => props.theme.primaryLink};
  border: none;
  padding: 0.8rem 1.6rem;
  font-weight: 500;
  line-height: normal;
  ${elevation(3)};
  ${transition({ prop: 'all', time: 0.15, name: 'easeOutQuart' })};
  &:hover,
  &:focus {
    transform: translateY(-1px);
    ${transition({ prop: 'all', time: 0.15, name: 'easeInCubic' })};
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.1), 0 4px 7px 0 rgba(0, 0, 0, 0.07);
    cursor: pointer;
  }
`;
export const SecondaryButton = styled(Button)`
  background: ${props => props.theme.secondary};
`;
export const Section = styled.section`
  max-width: 80rem;
  margin: 0 auto;
`;
export const A = styled.a`
  font-weight: 500;
  color: ${props => props.theme.primaryLink};
  &:hover {
    opacity: 0.8;
  }
`;
// Have to do the props thing because of a jest error
export const Link = styled(props => <UnstyledLink {...props} />)`
  font-weight: 500;
  color: ${props => props.theme.primaryLink};
  &:hover {
    opacity: 0.8;
  }
`;
export const P = styled.p`
  padding-bottom: 1.6rem;
  color: ${props => props.theme.primaryGrey};
  &:last-child {
    padding-bottom: 0;
  }
`;
export const DynamicSection = styled(Section)`
  a {
    font-weight: 500;
    color: ${props => props.theme.primaryLink};
    &:hover {
      opacity: 0.8;
    }
  }
  p {
    padding-bottom: 1.5rem;
    &:last-child {
      padding-bottom: 0;
    }
  }
  ul {
    list-style: initial;
    padding-left: 4rem;
  }
`;

export const Pdf: any = styled.object`
  height: 100%;
  width: 100%;
  padding-bottom: 2rem;
`;
export const Doc: any = styled.iframe`
  height: 100%;
  width: 100%;
  padding-bottom: 5rem;
`;
export const EmbedWrapper = styled.div`
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: hsl(206, 7%, 21%);
`;
export const ModalForm = styled.form`
  padding: 1.2rem 2rem 0;
  display: flex;
  flex-direction: column;
`;
export const ModalHeading = styled.h3`
  color: ${props => props.theme.primaryText};
  padding: 1.2rem 1.6rem 0;
  text-align: center;
`;
export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.warning};
  font-weight: 500;
  padding: 0;
  margin-left: 1.2rem;
  &:hover {
    cursor: pointer;
  }
`;
export const HighSevDeleteButton = styled(Button)`
  background: ${props => props.theme.warning};
  letter-spacing: 0.6px;
`;
export const OutlineButton = styled(Button)`
  border: 2px solid ${props => props.theme.primaryLink};
  padding: 0.8rem 1.4rem;
  background: none;
  color: ${props => props.theme.primaryLink};
  margin-right: 1.6rem;
`;
export const CreateButton: any = styled.button`
  background: ${props => props.theme.primary};
  border: none;
  color: ${props => props.theme.white};
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  border-radius: 20px;
  font-size: 1.4rem;
  line-height: normal;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
