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
import CustomizedSnackbar from './shared/CustomizedSnackbar';

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
    InProgress: false,
    shouldRedirect: false,
    hasMessage: false,
    user: {
      login: '',
      password: ''
    },
    snackbar: {
      variant: 'error',
      message: 'unexpected error'
    }
  };

  onInputChange = (evt) => {
    const user = this.state.user;
    user[evt.target.name] = evt.target.value;
    this.setState({ user });
  };

  onLoginClick = async () => {
    try {
      this.setState({ InProgress: true });

      await this.props.performLogin(
        this.state.user.login,
        this.state.user.password
      );

      this.setState({ shouldRedirect: true });

    } catch (err) {
      this.setState({
        InProgress: false,
        hasMessage: true,
        snackbar: {
          variant: 'error',
          message: 'Error while trying to log in'
        }
      });
      console.log(err);
    }
  };

  redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    return pathname || '/users';
  };

  closeMessage = () => {
    this.setState({ hasMessage: false });
  }

  render() {
    const { classes } = this.props;

    if (this.state.shouldRedirect) {
      return (
        <Redirect to={this.redirectPath()} />
      );
    } else if (this.state.InProgress) {
      return (
        <Progress />
      );
    } else {
      return (
        <Grid container className={classes.root}>
          <Grid item xs={2} xl={2} sm={4} md={4} lg={4}></Grid>
          <Grid item xs={8} xl={8} sm={4} md={4} lg={4}>
            {
              this.state.hasMessage ?
                <CustomizedSnackbar
                  parentClose={this.closeMessage}
                  variant={this.state.snackbar.variant}
                  message={this.state.snackbar.message}
                />
              : null
            }
            <Card>
              <CardHeader
                title="Login"
              />
              <CardContent>
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
                      type="password"
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
