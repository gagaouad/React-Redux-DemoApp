import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PostitNav from '../Footer/PostitNav';
import PostitEditor from '../Content/PostitEditor';
import PostitHeader from '../Header/PostitHeader';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function MainPostit() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PostitHeader />
      <PostitEditor />
      <PostitNav />
    </div>
  );
}

export default MainPostit;
