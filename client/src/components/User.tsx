import { navigate } from '@reach/router';
import * as React from 'react';

import { IUser } from '../types';
import * as api from '../utils/api';

interface IProps {
  children: (nodes: any) => React.ReactNode;
}

interface IState {
  user?: IUser;
  error?: string;
  loggedIn: boolean;
  pending: boolean;
}

export default class User extends React.Component<IProps, IState> {
  resetState = { user: undefined, error: undefined, pending: false, loggedIn: false };

  state = { ...this.resetState, pending: true };

  componentDidMount() {
    return api.auth
      .me()
      .then((user: IUser) => {
        this.reset(user);
      })
      .catch((error: any) => {
        console.error({ error });
        Promise.reject(this.reset({ error }));
      });
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (!prevState.loggedIn && this.state.loggedIn) {
      return api.auth
        .me()
        .then((user: IUser) => {
          navigate('/');
          this.reset({ user });
        })
        .catch((error: any) => {
          console.error({ error });
          Promise.reject(this.reset({ error }));
        });
    }
  }

  login = (...args: any) =>
    api.auth.login(...args).then(() => {
      this.reset({ pending: true, loggedIn: true });
    });

  logout = () => {
    this.reset({ pending: true });
    return api.auth.logout().then(() => this.reset(), ({ error }) => Promise.reject(this.reset({ error })));
  };

  register = (...args: any) => {
    this.reset({ pending: true });
    return api.auth
      .register(...args)
      .then(
        ({ user }: { user: IUser }) => this.reset({ user }),
        ({ error }: { error: any }) => Promise.reject(this.reset({ error }))
      );
  };

  reset(overrides?: any) {
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
