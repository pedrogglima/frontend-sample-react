import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Progress from './shared/Progress';

//import { client } from '../lib/Client';

const USERS = [
  {
    id: '7893AQgdwMNCiN7awXch5fAaG',
    firstName:'John',
    lastName:'Smith',
    avatar:'url1'
  },
  {
    id: '5673AQgdwMNCiN7awXch5fAaG',
    firstName:'Adam',
    lastName:'Rocky',
    avatar:'url2'
  },
  {
    id: '123AQgdwMNCiN7awXch5fAaG',
    firstName:'San',
    lastName:'Toddy',
    avatar:'url3'
  },
  {
    id: '003AQgJAhuquAKpo4qp5fAaG',
    firstName:'Humbert',
    lastName:'Oliver',
    avatar:'url4'
  }
];

class Users extends Component {
  state = {
    fetched: false,
    users: [],
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    // await client.getUsers();
    this.setState({
      fetched: true,
      users: USERS,
    });
  };

  render() {
    if (!this.state.fetched) {
      return (
        <Progress />
      );
    } else {
      return (
        <List >
        {this.state.users.map(user => (
          <ListItem key={user.id} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar ${user.avatar}`}
                src={'#'}
              />
            </ListItemAvatar>
            <ListItemText
              primary={user.lastName}
              secondary={user.firstName}
            />
            <ListItemSecondaryAction>
            <Button href="#text-buttons">
              Edit
            </Button>
            <Button href="#text-buttons">
              Delete
            </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      );
    }
  }
}

export default Users;
