import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = props => {
  props.performLogout();

  return <Redirect to="/login" />;
};

export default Logout;
