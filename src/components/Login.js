import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Progress from './shared/Progress';

//import { client } from '../lib/Client';

class Login extends Component {
  state = {
    loginInProgress: false,
    shouldRedirect: false,
    login: this.props.login || '',
    password: this.props.password || '',
  };

  handleLoginChange = e => {
    this.setState({ login: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
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
        <Grid container style={{marginTop: '30px'}}>
          <Grid item xs={2} xl={2} sm={4} md={4} lg={4}></Grid>
          <Grid item xs={8} xl={8} sm={4} md={4} lg={4}>
            <Card>
              <CardHeader
                title="Login"
              />
              <CardContent>
                {
                  this.state.loginInProgress ? (
                    <Progress />
                  ) : (
                    <div>
                      <FormControl required={true} margin="normal" fullWidth={true}>
                        <InputLabel htmlFor="component-simple">Login</InputLabel>
                        <Input
                          id="input_login_id"
                          value={this.state.login}
                          onChange={this.handleLoginChange}
                        />
                      </FormControl>

                      <FormControl required={true} margin="normal" fullWidth={true}>
                        <InputLabel htmlFor="component-simple">Password</InputLabel>
                        <Input
                          id="input_password_id"
                          value={this.state.password}
                          onChange={this.handlePasswordChange}
                        />
                      </FormControl>

                      <div style={{ width: '100%', marginTop: '10px' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          style={{ width: '100%' }}
                          onClick={this.performLogin}
                        >
                          Log in
                        </Button>
                      </div>
                    </div>
                  )
                }
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2} xl={2} sm={4} md={4} lg={4}></Grid>
        </Grid>
      );
    }
  }
}

export default Login;
