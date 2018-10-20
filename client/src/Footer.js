import React from 'react';
import styled from 'styled-components';
import colors from 'utils/colors';

const Footer = () => (
  <FooterContainer>
    <h3 className="heading">Created by Victor Valdez and Alex Wendte</h3>
  </FooterContainer>
);
export default Footer;

const FooterContainer = styled.div`
  background: ${props => props.theme.primary};
  color: ${colors.white};
  padding: 1rem;
  .heading {
    font-size: 1.6rem;
    text-align: center;
  }
`;
