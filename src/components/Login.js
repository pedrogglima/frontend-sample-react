import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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

const styles = theme => ({
  root: {
    marginTop: '30px'
  },
  buttonWrapper: {
    width: '100%',
    marginTop: '10px'
  },
  button: {
    width: '100%'
  },
});

class Login extends Component {
  state = {
    loginInProgress: false,
    shouldRedirect: false,
    user: {
      login: '',
      password: ''
    }
  };

  onInputChange = (evt) => {
    const user = this.state.user;
    user[evt.target.name] = evt.target.value;
    this.setState({ user });
  };

  onLoginClick = async () => {
    this.setState({ loginInProgress: true });

    try {
      await this.props.performLogin(
        this.state.user.login,
        this.state.user.password
      );
      this.setState({ shouldRedirect: true });

    } catch (err) {
      this.setState({ loginInProgress: false });
      console.log('show error message: ' + err);
    }
  };

  redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    return pathname || '/users';
  };

  render() {
    const { classes } = this.props;

    if (this.state.shouldRedirect) {
      return (
        <Redirect to={this.redirectPath()} />
      );
    } else {
      return (
        <Grid container className={classes.root}>
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
                      <FormControl required margin="normal" fullWidth>
                        <InputLabel htmlFor="component-simple">Login</InputLabel>
                        <Input
                          id="input_login_id"
                          name='login'
                          value={this.state.user.login}
                          onChange={this.onInputChange}
                        />
                      </FormControl>
                      <small>login: eve.holt@reqres.in</small>

                      <FormControl required margin="normal" fullWidth>
                        <InputLabel htmlFor="component-simple">Password</InputLabel>
                        <Input
                          id="input_password_id"
                          name='password'
                          value={this.state.user.password}
                          onChange={this.onInputChange}
                        />
                      </FormControl>
                      <small>password: 1234</small>

                      <div className={classes.buttonWrapper} >
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.button}
                          onClick={this.onLoginClick}
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  performLogin: PropTypes.func.isRequired
};

export default withStyles(styles)(Login);
