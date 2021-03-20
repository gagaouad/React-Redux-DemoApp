import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  postit: {
    height: 250,
    width: 250,
  },
}));

function Board({ boards }) {
  const { id } = useParams();
  const { postits } = boards[id];
  const classes = useStyles();
  return (
    <Grid container className={classes.root} justify="center" item xs={12} spacing={2}>
      {postits.map((postit) => (
        <Grid key={uuidv4()} item>
          <Card className={classes.postit} justify="center" style={{ background: postit.color }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {postit.title}
              </Typography>
              <Typography variant="h5" component="h2">
                {postit.text}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

Board.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.string,
      notes: PropTypes.string,
      postits: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string,
          board: PropTypes.string,
          title: PropTypes.string,
          text: PropTypes.string,
          visible: PropTypes.bool,
          color: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  boards: state.boards,
});

export default withRouter(connect(mapStateToProps)(Board));
