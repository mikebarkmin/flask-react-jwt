import React from 'react';
import Login from './Login';

const getClaims = accessToken => {
  if (!accessToken) return {};
  const base64Url = accessToken.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
};

const withAuth = allowedRoles => {
  return WrappedComponent => {
    class Auth extends React.Component {
      constructor(props) {
        super(props);
        const accessToken = window.localStorage.getItem('accessToken');
        this.state = {
          accessToken,
          claims: getClaims(accessToken)
        };
      }

      handleLogin = accessToken => {
        this.setState({
          accessToken,
          claims: getClaims(accessToken)
        });

        // for easy access in other components save accessToken to localStorage
        window.localStorage.setItem('accessToken', accessToken);
      };

      handleLogout = () => {
        this.setState({
          accessToken: null,
          claims: {}
        });

        window.localStorage.removeItem('accessToken');
      };

      render() {
        const { accessToken, claims } = this.state;
        if (
          accessToken &&
          (!allowedRoles ||
            allowedRoles.includes(claims['user_claims']['role']))
        ) {
          return (
            <WrappedComponent
              claims={claims}
              logout={this.handleLogout}
              {...this.props}
            />
          );
        }

        return (
          <Login onLogin={this.handleLogin} onLoginError={this.handeLogout} />
        );
      }
    }

    return Auth;
  };
};

export default withAuth;
