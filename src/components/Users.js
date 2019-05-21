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
import { client } from '../lib/Client';


const USERS = {
  userPage: 1,
  userPerPage: 3,
  userTotal: 12,
  userTotalPages: 4,
  userList: [
    {
      id:1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
    },
    {
      id: 2,
      email: "janet.weaver@reqres.in",
      first_name: "Janet","last_name":"Weaver",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
    },
    {
      id: 3,
      email: "emma.wong@reqres.in",
      first_name: "Emma",
      last_name: "Wong",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
    }
  ]
}

class Users extends Component {
  state = {
    fetched: false,
    users: [],
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      //const users = await client.findByPage();
      //console.log('users-getUsers: ' + JSON.stringify(users));
      this.setState({
        fetched: true,
        users: USERS,
        //users: users,
      });
    } catch (err) {
      console.log('Show users error message: ' + err);
    }
  };

  render() {
    if (!this.state.fetched) {
      return (
        <Progress />
      );
    } else {
      return (
        <List >
        {this.state.users.userList.map(user => (
          <ListItem key={user.id} button>
            <ListItemAvatar>
              <Avatar
                alt={'Avatar'}
                src={user.avatar}
              />
            </ListItemAvatar>
            <ListItemText
              primary={user.last_name}
              secondary={user.first_name}
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
