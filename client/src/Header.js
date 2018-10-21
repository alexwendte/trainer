import React from 'react';
import styled from 'styled-components';
import colors from 'utils/colors';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const Header = ({ user, logout }) => (
  <HeaderContainer>
    <h2 className="heading">Trainer</h2>
    <div className="links">
      <Link className="link" to="/mentors">
        Mentors
      </Link>
    </div>
    <UserBtnsContainer>
      {user && user.name ? (
        <div>
          <Profile>
            <p>{user.name} &#9660;</p>
            <Link className="view-profile" to="/profile">
              View Profile
            </Link>
          </Profile>
          <UserBtn onClick={logout} to="/">
            Logout
          </UserBtn>
        </div>
      ) : (
        <div>
          <UserBtn to="/login">Login</UserBtn>
          <UserBtn to="/registration">Register</UserBtn>
        </div>
      )}
    </UserBtnsContainer>
  </HeaderContainer>
);
export default Header;

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};

const HeaderContainer = styled.div`
  background: ${props => props.theme.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  .heading {
    display: inline-block;
    color: ${colors.white};
    width: 22.2rem;
  }
  .links {
    display: inline-block;
    font-size: 2.4rem;
  }
  .link {
    display: inline-block;
    padding-left: 2rem;
    font-size: 2rem;
    font-weight: 600;
    color: ${colors.white};
  }
`;

const UserBtnsContainer = styled.div`
  display: inline-block;
`;

const UserBtn = styled(Link)`
  margin-left: 2rem;
  border-radius: 5px;
  color: ${props => props.theme.primary};
  background: ${props => props.theme.white};
  border: none;
  padding: 1rem 1.5rem;
  font-weight: 600;
  font-size: 1.8rem;
  transition: all 0.3s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  display: inline-block;
  &:hover {
    transform: translateY(-1px);
    transition: all 0.15s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  }
`;

const Profile = styled.div`
  margin-left: 2rem;
  border-radius: 5px;
  color: ${props => props.theme.primary};
  background: ${props => props.theme.white};
  border: none;
  padding: 1rem 1.5rem;
  font-weight: 600;
  font-size: 1.8rem;
  display: inline-block;
  position: relative;
  .view-profile {
    display: none;
    position: absolute;
  }

  &:hover {
    .view-profile {
      display: block;
      position: absolute;
      background: ${props => props.theme.gray};
      width: 14.4rem;
      color: white;
      left: 0;
      padding: 1.5rem;
      margin-top: 1rem;
      border-radius: 5px;
      &:hover {
        background: #516264;
      }
    }
  }
`;
