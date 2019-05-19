import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Header = () => (
  <AppBar position="relative">
    <Toolbar>
      <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
        Frontend
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);

export default Header;
