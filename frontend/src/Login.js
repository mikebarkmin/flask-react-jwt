import React from 'react';

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handleLogin = e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(json => {
        const accessToken = json.access_token;
        this.props.onLogin(accessToken);
      })
      .catch(error => {
        this.props.onLoginError();
      });
  };

  handleUsernameChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Username:
        <br />
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <br />
        Password:
        <br />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <br />
        <button onClick={this.handleLogin}>Login</button>
      </form>
    );
  }
}

export default Login;
