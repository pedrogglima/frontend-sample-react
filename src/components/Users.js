import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import CustomizedSnackbar from './shared/CustomizedSnackbar';
import Progress from './shared/Progress';
import { client } from '../lib/Client';

const USER = {
  id: 1,
  first_name: "George",
  last_name: "Bluth",
  avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
}

const USERS = {
  user_page: 1,
  user_per_page: 3,
  user_total: 12,
  user_total_pages: 4,
  user_list: [
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

const ListItemComponent = (props) => {
  const onEditClick = () => {
    props.redirectToEdit(props.user.id);
  };

  const onDeleteClick = () => {
    props.performDelete(props.user.id);
  };

  return (
    <ListItem key={props.user.id} button>
      <ListItemAvatar>
        <Avatar
          alt={'Avatar'}
          src={props.user.avatar}
        />
      </ListItemAvatar>
      <ListItemText
        primary={props.user.last_name}
        secondary={props.user.first_name}
      />
      <ListItemSecondaryAction>
      <Button onClick={onEditClick}>
        Edit
      </Button>
      <Button onClick={onDeleteClick}>
        Delete
      </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

class Users extends Component {
  state = {
    inProgress: true,
    users: null,
    hasMessage: false,
    snackbar: {
      variant: 'error',
      message: 'unexpected error'
    }
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      // const users = await client.findByPage();
      this.setState({
        inProgress: false,
        users: USERS,
        //users: users,
      });
    } catch (err) {
      this.setState({
        inProgress: false,
        hasMessage: true,
        snackbar: {
          variant: 'error',
          message: 'Error while loading the users, try later'
        }
      });
    }
  };

  redirectToEdit = async (id) => {
    try {
      this.setState({ inProgress: true });
      //const user = await client.findById(id);

      // Observation
      // State passed throught the URL has a size limit e.g Firefox has
      // a size limit of 640k characters on the serialized representation
      // of a state object.
      // It may be necessary check the size of the obj, otherwise it may
      // throw a error message.
      this.props.history.push({
        pathname: '/users/' + id,
        //state: { user: user }
        state: { user: USER }
      })

      this.setState({ inProgress: false });

    } catch(err) {
      this.setState({
        inProgress: false,
        hasMessage: true,
        snackbar: {
          variant: 'error',
          message: 'Error while loading the user, try later'
        }
      });
    }
  }

  performDelete = async (id) => {
    try {
      this.setState({ inProgress: true });
      //await client.deleteById(id);

      this.setState({
        inProgress: false,
        users: Object.assign(this.state.users, {
          user_list: this.state.users.user_list.filter(u => u.id !== id)
        }),
        hasMessage: true,
        snackbar: {
          variant: 'success',
          message: 'Successfully deleted'
        }
      });
    } catch(err) {
      this.setState({
        inProgress: false,
        hasMessage: true,
        snackbar: {
          variant: 'error',
          message: 'Error while deleting the user'
        }
      });
    }
  }

  closeMessage = () => {
    this.setState({ hasMessage: false });
  }

  // Missing
  // case where users_list is empty
  render() {
    if (this.state.inProgress) {
      return (
        <Progress />
      );
    } else {
      return (
        <div>
          {
            this.state.hasMessage ?
              <CustomizedSnackbar
                parentClose={this.closeMessage}
                variant={this.state.snackbar.variant}
                message={this.state.snackbar.message}
              />
            : null
          }
          <List >
            {this.state.users.user_list.map(user => (
              <ListItemComponent
                user={user}
                redirectToEdit={this.redirectToEdit}
                performDelete={this.performDelete}
              />
            ))}'
          </List>
        </div>
      );
    }
  }
}

export default Users;
