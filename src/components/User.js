import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { client } from '../lib/Client';

const USER = {
  user: '3AQgdwMNCiN7awXch5fAaG'
};

class User extends Component {
  state = {
    fetched: false,
    user: null
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    // await client.getUser();
    this.setState({
      fetched: true,
      user: USER,
    });
  };

  render() {
    if (!this.state.fetched) {
      return (
        <div>loading...</div>
      );
    } else {
      return (
        <div> Show User </div>
      );
    }
  }
}

export default User;
