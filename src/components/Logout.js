import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import { client } from '../lib/Client';

class Logout extends Component {

  constructor(props) {
    super(props);

    //await client.logout();
  }

  render() {
    return (
      <Redirect
        to='/login'
      />
    );
  }
}

export default Logout;
