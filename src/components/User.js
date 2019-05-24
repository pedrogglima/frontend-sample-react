import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
import { UserApi } from '../lib/user';

const styles = theme => ({
  root: {
    marginTop: '30px',
  },
  buttonWrapper: {
    width: '100%',
    marginTop: '10px',
  },
  button: {
    width: '100%',
  },
});

class User extends Component {
  state = {
    inProgress: false,
    hasMessage: false,
    user: this.props.location.state.user,
    snackbar: {
      variant: 'error',
      message: 'unexpected error',
    },
  };

  onInputChange = evt => {
    const user = this.state.user;
    user[evt.target.name] = evt.target.value;
    this.setState({ user });
  };

  performUpdate = async () => {
    try {
      this.setState({ inProgress: true });
      await UserApi.update(this.state.user);
      this.setState({
        inProgress: false,
        hasMessage: true,
        snackbar: {
          variant: 'success',
          message: 'Successfully updated',
        },
      });
    } catch (err) {
      this.setState({
        inProgress: false,
        hasMessage: true,
        snackbar: {
          variant: 'error',
          message: 'Error while trying to update',
        },
      });
      console.log(err);
    }
  };

  closeMessage = () => {
    this.setState({ hasMessage: false });
  };

  render() {
    const { classes } = this.props;

    if (this.state.inProgress) {
      return <Progress />;
    } else {
      return (
        <Grid container className={classes.root}>
          <Grid item xs={1} sm={2} md={3} lg={3} xl={4} />
          <Grid item xs={10} sm={8} md={6} lg={6} xl={4}>
            {this.state.hasMessage ? (
              <CustomizedSnackbar
                parentClose={this.closeMessage}
                variant={this.state.snackbar.variant}
                message={this.state.snackbar.message}
              />
            ) : null}
            <Card>
              <CardHeader title="Editar" />
              <CardContent>
                <div>
                  <FormControl required margin="normal" fullWidth>
                    <InputLabel htmlFor="component-simple">
                      First name
                    </InputLabel>
                    <Input
                      id="input_first_name_id"
                      name="first_name"
                      value={this.state.user.first_name}
                      onChange={this.onInputChange}
                    />
                  </FormControl>

                  <FormControl required margin="normal" fullWidth>
                    <InputLabel htmlFor="component-simple">
                      Last name
                    </InputLabel>
                    <Input
                      id="input_last_name_id"
                      name="last_name"
                      value={this.state.user.last_name}
                      onChange={this.onInputChange}
                    />
                  </FormControl>

                  <div className={classes.buttonWrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      onClick={this.performUpdate}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={3} xl={4} />
        </Grid>
      );
    }
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      user: PropTypes.object.isRequired,
    }),
  }),
};

export default withStyles(styles)(User);
