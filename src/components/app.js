import React from 'react';
import Grid from '@material-ui/core/Grid';

class App extends React.Component {

  render() {
    return (
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    );
  }
}

export default App;
