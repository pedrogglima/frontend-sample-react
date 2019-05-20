import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Header = (props) => (
  <AppBar position="relative">
    <Toolbar>
      <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
        Frontend
      </Typography>
      {
        props.isLoggedIn ? (
          <Button
            color="inherit"
            onClick={props.onLogoutClick}
          >
            Logout
          </Button>
        ) : (
          null
        )
      }
    </Toolbar>
  </AppBar>
);

export default Header;
