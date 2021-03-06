import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ListWithPagination from './users/ListUsers';
import CustomizedSnackbar from './shared/CustomizedSnackbar';
import Progress from './shared/Progress';
import { UserApi } from '../lib/user';

class Users extends Component {
  state = {
    inProgress: false,
    hasMessage: false,
    users: {
      page: 0,
      per_page: 0,
      total: 0,
      total_pages: 0,
      data: [],
    },
    pagination: {
      offset: 0,
    },
    snackbar: {
      variant: 'error',
      message: 'unexpected error',
    },
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async (offset = 0, page = 1) => {
    try {
      this.setState({ inProgress: true });
      const users = await UserApi.findByPage(page);
      this.setState({
        inProgress: false,
        users: users,
        pagination: {
          offset: offset,
        },
      });
    } catch (err) {
      this.setState({
        inProgress: false,
        hasMessage: true,
        snackbar: {
          variant: 'error',
          message: 'Error while loading the users, try later',
        },
      });
      console.log(err);
    }
  };

  redirectToEdit = async id => {
    try {
      this.setState({ inProgress: true });
      const user = await UserApi.findById(id);

      // Observation
      // State passed throught the URL has a size limit e.g Firefox has
      // a size limit of 640k characters on the serialized representation
      // of a state object.
      // It may be necessary check the size of the obj, otherwise it may
      // throw a error message.
      this.props.history.push({
        pathname: '/users/' + id,
        state: { user: user },
      });

      this.setState({ inProgress: false });
    } catch (err) {
      this.setState({
        inProgress: false,
        hasMessage: true,
        snackbar: {
          variant: 'error',
          message: 'Error while loading the user, try later',
        },
      });
      console.log(err);
    }
  };

  performDelete = async id => {
    try {
      this.setState({ inProgress: true });
      await UserApi.deleteById(id);

      this.setState({
        inProgress: false,
        users: Object.assign(this.state.users, {
          data: this.state.users.data.filter(u => u.id !== id),
        }),
        hasMessage: true,
        snackbar: {
          variant: 'success',
          message: 'Successfully deleted',
        },
      });
    } catch (err) {
      this.setState({
        inProgress: false,
        hasMessage: true,
        snackbar: {
          variant: 'error',
          message: 'Error while deleting the user',
        },
      });
      console.log(err);
    }
  };

  performPageChange = (offset, page) => {
    this.getUsers(offset, page);
  };

  closeMessage = () => {
    this.setState({ hasMessage: false });
  };

  render() {
    if (this.state.inProgress) {
      return <Progress />;
    } else {
      return (
        <div>
          {this.state.hasMessage ? (
            <CustomizedSnackbar
              parentClose={this.closeMessage}
              variant={this.state.snackbar.variant}
              message={this.state.snackbar.message}
            />
          ) : null}
          {this.state.users.data.length === 0 ? (
            <Typography variant="h6" align="center" color="default">
              There are no users registered
            </Typography>
          ) : (
            <ListWithPagination
              users={this.state.users}
              pagination={this.state.pagination}
              redirectToEdit={this.redirectToEdit}
              performDelete={this.performDelete}
              performPageChange={this.performPageChange}
            />
          )}
        </div>
      );
    }
  }
}

Users.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Users;
