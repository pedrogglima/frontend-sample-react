import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { client } from '../lib/Client';

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={(props) => (
    client.isLoggedIn() ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }} />
    )
  )} />
);

export default PrivateRoute;