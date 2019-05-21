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

import { client } from '../lib/Client';

const USER = {
  id: 1,
  first_name: "George",
  last_name: "Bluth",
  avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
}

class User extends Component {
  state = {
    updateInProgress: false,
    user: null,
    firstName: '',
    lastName: '',
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    try {
      //const urlParams = this.props.location.search;
      // extract params from urlParams
      const user = await client.findById(1);
      this.setState({
        fetched: true,
        user: user,
        //user: USER,
      });
    } catch (err) {
      console.log('Show user error message: ' + err);
    }
  };

  handleFirstNameChange = e => {
    this.setState({ firstName: e.target.value });
  };

  handleLastNameChange = e => {
    this.setState({ lastName: e.target.value });
  };

  performUpdate = async () => {
    try {
      this.setState({ updateInProgress: true });
      await client.update(
        this.state.user.first_name,
        this.state.user.last_name
      );
      this.setState({ shouldRedirect: true });
    } catch (err) {
      console.log('Show user error message: ' + err);
    }
  };

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to={'/users'} />
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
                          value={this.state.user.fist_name}
                          onChange={this.handleFirstNameChange}
                        />
                      </FormControl>

                      <FormControl required={true} margin="normal" fullWidth={true}>
                        <InputLabel htmlFor="component-simple">Last name</InputLabel>
                        <Input
                          id="input_last_name_id"
                          value={this.state.user.last_name}
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
