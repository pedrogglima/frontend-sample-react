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

import { client } from '../lib/Client';

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
  }
});

class User extends Component {
  state = {
    inProgress: false,
    shouldRedirect: false,
    user: this.props.location.state.user,
  };

  onInputChange = (evt) => {
    const user = this.state.user;
    user[evt.target.name] = evt.target.value;
    this.setState({ user });
  };

  performUpdate = async () => {
    try {
      this.setState({ inProgress: true });
      //await client.update(this.state.user);
      this.setState({ shouldRedirect: true });
    } catch (err) {
      this.setState({ inProgress: false });
      console.log('Show user error message: ' + err);
    }
  };

  render() {
    const { classes } = this.props;

    if (this.state.shouldRedirect) {
      return (
        <Redirect to={'/users'} />
      );
    } else {
      return (
        <Grid container className={classes.root}>
          <Grid item xs={2} xl={2} sm={4} md={4} lg={4}></Grid>
          <Grid item xs={8} xl={8} sm={4} md={4} lg={4}>
            <Card>
              <CardHeader
                title="Editar"
              />
              <CardContent>
                {
                  this.state.inProgress ? (
                    <Progress />
                  ) : (
                    <div>
                      <FormControl required margin="normal" fullWidth>
                        <InputLabel htmlFor="component-simple">First name</InputLabel>
                        <Input
                          id="input_first_name_id"
                          name='first_name'
                          value={this.state.user.first_name}
                          onChange={this.onInputChange}
                        />
                      </FormControl>

                      <FormControl required margin="normal" fullWidth>
                        <InputLabel htmlFor="component-simple">Last name</InputLabel>
                        <Input
                          id="input_last_name_id"
                          name='last_name'
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

User.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      user: PropTypes.object.isRequired
    })
  }),
};

export default withStyles(styles)(User);
