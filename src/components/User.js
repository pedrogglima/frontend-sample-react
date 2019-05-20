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

const USER = {
  user: '3AQgdwMNCiN7awXch5fAaG'
};

class User extends Component {
  state = {
    updateInProgress: false,
    fetched: false,
    user: null,
    firstName: '',
    lastName: '',
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    // await client.getUser();
    this.setState({
      fetched: true,
      user: USER,
    });
  };

  handleFirstNameChange = e => {
    this.setState({ firstName: e.target.value });
  };

  handleLastNameChange = e => {
    this.setState({ lastName: e.target.value });
  };

  performUpdate = () => {
    this.setState({ updateInProgress: true });
    // await client.update();
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
                title="Editar"
              />
              <CardContent>
                {
                  this.state.updateInProgress ? (
                    <Progress />
                  ) : (
                    <div>
                      <FormControl required={true} margin="normal" fullWidth={true}>
                        <InputLabel htmlFor="component-simple">First name</InputLabel>
                        <Input
                          id="input_first_name_id"
                          value={this.state.firstName}
                          onChange={this.handleFirstNameChange}
                        />
                      </FormControl>

                      <FormControl required={true} margin="normal" fullWidth={true}>
                        <InputLabel htmlFor="component-simple">Last name</InputLabel>
                        <Input
                          id="input_last_name_id"
                          value={this.state.lastName}
                          onChange={this.handleLastNameChange}
                        />
                      </FormControl>

                      <div style={{ width: '100%', marginTop: '10px' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          style={{ width: '100%' }}
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

export default User;
