import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbarContent from './snackbars/ContentWrapper';

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
            message={this.props.message}
            variant={this.props.variant}
          />
        </Snackbar>
      </div>
    );
  }
}

CustomizedSnackbar.propTypes = {
  parentClose: PropTypes.func.isRequired,
  message: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default CustomizedSnackbar;
