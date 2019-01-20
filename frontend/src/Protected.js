import React from 'react';
import withAuth from './withAuth';

class Protected extends React.Component {
  state = {
    data: []
  };

  fetchData = () => {
    fetch('http://localhost:5000/api/protected', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.accessToken}`
      }
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Access denied');
        }
        return response.json();
      })
      .then(json =>
        this.setState({
          data: json.data
        })
      )
      .catch(() => this.props.logout());
  };
  render() {
    return (
      <div>
        <h1>Protected</h1>
        <p>{JSON.stringify(this.props.claims)}</p>
        <button onClick={this.props.logout}>Logout</button>
        <button onClick={this.fetchData}>Fetch Protected Data</button>
        <ul>
          {this.state.data.map((data, i) => (
            <li key={i}>{data}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withAuth()(Protected);
