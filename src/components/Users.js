import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Progress from './shared/Progress';
import { client } from '../lib/Client';

const USER = {
  id: 1,
  first_name: "George",
  last_name: "Bluth",
  avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
}

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
      first_name: "Janet",
      last_name: "Weaver",
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
    inProgress: true,
    users: [],
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      //const users = await client.findByPage();
      this.setState({
        inProgress: false,
        users: USERS,
        //users: users,
      });
    } catch (err) {
      console.log('Show users error message: ' + err);
    }
  };

  redirectToEdit = async () => {
    try {
      this.setState({ inProgress: true });

      //const urlParams = this.props.location.search;
      // extract params from urlParams
      // arrumar URL para users?id=1
      // Ver se é necessário fazer uma chamada para encontrar USER
      // ou é possível recuperar from the DOM.
      //const user = await client.findById(1);

      this.props.history.push({
        pathname: '/users/1',
        // search: '?id=1',
        //state: { user: user }
        state: { user: USER }
      })

      this.setState({ inProgress: false });

    } catch(err) {
      this.setState({ inProgress: false });
      console.log('Show user error message: ' + err);
    }
  }

  performDelete = async () => {
    // delete user
  }

  render() {
    if (this.state.inProgress) {
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
            <Button onClick={this.redirectToEdit}>
              Edit
            </Button>
            <Button onClick={this.performDelete}>
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
