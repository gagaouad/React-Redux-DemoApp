import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RefreshIcon from '@material-ui/icons/Refresh';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { nextBoard, resetDrawPoints } from '../../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function PostitHeader({
  boards, next, currentBoard, reset,
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
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton} onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {boards.map((board, i) => (
              <MenuItem
                key={uuidv4()}
                onClick={() => handleMenuItemClick()}
              >
                <Link to={`/${i}`}>{board.title}</Link>
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="h6" className={classes.title} color="inherit">
            {boards[currentBoard].title}
          </Typography>
          <IconButton
            aria-label="Add"
            color="inherit"
            onClick={next}
          >
            <AddCircleIcon />
          </IconButton>
          <IconButton
            aria-label="Reset"
            color="inherit"
            onClick={reset}
          >
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

PostitHeader.propTypes = {
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
  next: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  boards: state.boards,
  currentBoard: state.currentBoard,
});

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch(nextBoard(true)),
  reset: () => dispatch(resetDrawPoints(true, true)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostitHeader));
