import React from 'react';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbarContent from './snackbars/ContentWrapper';

const styles = theme => ({})

class CustomizedSnackbar extends React.Component {
  state = {
    open: true,
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
    this.props.parentClose();
  };

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.handleClose}
        >
          <CustomizedSnackbarContent
            onClose={this.handleClose}
            variant={this.props.variant}
            message={this.props.message}
          />
        </Snackbar>
      </div>
    );
  }
}

CustomizedSnackbar.propTypes = {
  parentClose: PropTypes.func,
  message: PropTypes.node,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default withStyles(styles)(CustomizedSnackbar);
