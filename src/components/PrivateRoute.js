import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { client } from '../lib/client';

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      client.isLoggedIn() ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
