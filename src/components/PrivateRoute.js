import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LOGIN = true;

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={(props) => (
    //isLoggedIn();
    LOGIN ? (
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
