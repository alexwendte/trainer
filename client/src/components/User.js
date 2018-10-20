import { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../utils/api';

export default class User extends Component {
  initialState = { user: null, error: null, pending: false };

  state = this.initialState;

  componentDidMount() {
    this.reset({ pending: true });
    return api.auth.me().then(({ user }) => this.reset({ user }), ({ error }) => Promise.reject(this.reset({ error })));
  }

  login = (...args) => {
    this.reset({ pending: true });
    return api.auth
      .login(...args)
      .then(({ user }) => this.reset({ user }), ({ error }) => Promise.reject(this.reset({ error })));
  };

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
    const newState = { ...this.initialState, ...overrides };
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
