import React from 'react';
import styled from 'styled-components';
import colors from 'utils/colors';
import { Link } from '@reach/router';

const Header = () => (
  <HeaderContainer>
    <h2 className="heading">The Wendtes</h2>
    <ul className="links">
      <li className="link">
        <Link to="/">Home</Link>
      </li>
      <li className="link">
        <Link to="/about-us">About Us</Link>
      </li>
      <li className="link">
        <Link to="/posts">Posts</Link>
      </li>
      <li className="link">
        <Link to="/register">Register</Link>
      </li>
      <li className="link">
        <Link to="/login">Login</Link>
      </li>
    </ul>
  </HeaderContainer>
);
export default Header;

const HeaderContainer = styled.div`
  background: ${props => props.theme.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  .heading {
    display: inline-block;
    color: ${colors.white};
  }
  .links {
    display: inline-block;
    font-size: 2.4rem;
  }
  .link {
    display: inline-block;
    padding-left: 2rem;
    font-size: 2.4rem;
    font-weight: 600;
    a {
      color: ${colors.white};
    }
  }
`;
