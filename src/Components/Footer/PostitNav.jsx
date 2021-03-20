import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { nextBoard, nextPostit, prevPostit } from '../../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

function PostitNav({
  boards, currentBoard, nextPost, prevPost,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {boards[currentBoard].postits.map((postit) => (
              <MenuItem
                key={uuidv4()}
                onClick={() => handleMenuItemClick()}
              >
                {postit.title}
              </MenuItem>
            ))}
          </Menu>
          <div className={classes.grow} />
          <IconButton color="inherit" onClick={prevPost}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton edge="end" color="inherit" onClick={nextPost}>
            <SkipNextIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

PostitNav.propTypes = {
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
          test: PropTypes.string,
          visible: PropTypes.bool,
          color: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  currentBoard: PropTypes.number.isRequired,
  nextPost: PropTypes.func.isRequired,
  prevPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  boards: state.boards,
  currentBoard: state.currentBoard,
});

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch(nextBoard(true)),
  nextPost: () => dispatch(nextPostit(true)),
  prevPost: () => dispatch(prevPostit(true)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostitNav));
