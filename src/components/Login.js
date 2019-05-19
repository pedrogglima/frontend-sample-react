import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { client } from '../lib/Client';

class Login extends Component {
  state = {
    loginInProgress: false,
    shouldRedirect: false,
  };

  performLogin = () => {
    this.setState({ loginInProgress: true });
    // await client.login();
    this.setState({ shouldRedirect: true });
  };

  redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    return pathname || '/users';
  };

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to={this.redirectPath()} />
      );
    } else {
      return (
        <div>
          Div para centralizar Form
          {
            this.state.loginInProgress ? (
              <div>Loading...</div>
            ) : (
              <div>
                Form para preenchimento
                <div
                  onClick={this.performLogin}
                >
                  Click para logar
                </div>
              </div>
            )
          }
        </div>
      );
    }
  }
}

export default Login;
