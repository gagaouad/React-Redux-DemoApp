import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppToolbar from '../Header/AppToolbar';
import Board from '../Content/Board';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppToolbar />
      <Board />
    </div>
  );
}

export default App;
