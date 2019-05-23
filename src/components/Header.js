import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

const Header = (props) => {
  const {classes} = props

  const onRedirectTo = () => {
    props.history.push({
      pathname: '/users'
    })
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
          Frontend
        </Typography>
        {
          props.admin.isLoggedIn ? (
            <div className={classes.root}>
              <IconButton
                aria-label="USERS"
                style={{color: 'white'}}
                onClick={onRedirectTo}
              >
                <PeopleIcon className="material-icons" />
              </IconButton>
              <IconButton
                aria-label="LOGOUT"
                style={{color: 'white'}}
                onClick={props.onLogoutClick}
              >
                <ExitToAppIcon className="material-icons" />
              </IconButton>
            </div>
          ) : (
            null
          )
        }
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Header));
