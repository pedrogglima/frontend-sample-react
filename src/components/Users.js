import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { client } from '../lib/Client';

const USERS = [
  '23O4F21GDWiGd33tFN3ZgI',
  '3AQgdwMNCiN7awXch5fAaG',
  '1kmyirVya5fRxdjsPFDM05',
  '6ymZBbRSmzAvoSGmwAFoxm',
  '4Mw9Gcu1LT7JaipXdwrq1Q',
];

class Users extends Component {
  state = {
    fetched: false,
    users: [],
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    // await client.getUsers();
    this.setState({
      fetched: true,
      albums: USERS,
    });
  };

  render() {
    if (!this.state.fetched) {
      return (
        <div>loading...</div>
      );
    } else {
      return (
        <div>Show List of Users</div>
      );
    }
  }
}

export default Users;
