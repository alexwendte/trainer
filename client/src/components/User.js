import { Component } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import * as api from '../utils/api';

export default class User extends Component {
  resetState = { user: null, error: null, pending: false, loggedIn: false };

  state = { ...this.resetState, pending: true };

  componentDidMount() {
    return api.auth
      .me()
      .then(user => this.reset({ user }))
      .catch(error => {
        console.error({ error });
        Promise.reject(this.reset({ error }));
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.loggedIn && this.state.loggedIn) {
      return api.auth
        .me()
        .then(user => {
          navigate('/');
          this.reset({ user });
        })
        .catch(error => {
          console.error({ error });
          Promise.reject(this.reset({ error }));
        });
    }
  }

  login = (...args) => api.auth.login(...args).then(() => {
      this.reset({ pending: true, loggedIn: true });
    });

  logout = () => {
    this.reset({ pending: true });
    return api.auth.logout().then(() => this.reset(), ({ error }) => Promise.reject(this.reset({ error })));
  };

  register = (...args) => {
    this.reset({ pending: true });
    return api.auth
      .register(...args)
      .then(({ user }) => this.reset({ user }), ({ error }) => Promise.reject(this.reset({ error })));
  };

  reset(overrides) {
    const newState = { ...this.resetState, ...overrides };
    this.setState(newState);
    return newState;
  }

  render() {
    const { children } = this.props;
    return children({
      ...this.state,
      login: this.login,
      logout: this.logout,
      register: this.register,
    });
  }
}

User.propTypes = {
  children: PropTypes.func.isRequired,
};
