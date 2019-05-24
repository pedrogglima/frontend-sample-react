import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    display: 'flex',
    height: '80vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Progress = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Progress);
