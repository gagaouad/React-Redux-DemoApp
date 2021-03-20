import {
  CREATE_BOARD,
  DELETE_BOARD,
  NEXT_BOARD,
  SET_BOARD,
  NEXT_POSTIT,
  PREV_POSTIT,
  ADD_DRAW_POINTS,
  RESET_DRAW_POINTS,
} from '../actions/index';

const initialState = {
  index: 1,
  currentBoard: 0,
  nbBoards: 2,
  posIndex: 0,
  boards: [
    {
      type: 'board',
      id: '1',
      title: 'TIW 8',
      notes: '',
      postits: [
        {
          type: 'postit',
          board: '1',
          title: 'TP 1',
          text: 'Le TP porte sur des rappels de developpement Web',
          visible: false,
          color: '#CCC',
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
          },
        },
        {
          type: 'postit',
          board: '1',
          title: 'TP 2',
          text: "Le TP porte sur la creation d'un outil de presentation HTML",
          visible: true,
          color: '#00E',
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
          },
        },
        {
          type: 'postit',
          board: '1',
          title: 'TP 3',
          text: 'Le TP 3',
          visible: true,
          color: '#00E',
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
          },
        },
        {
          type: 'postit',
          board: '1',
          title: 'TP 4',
          text: 'Le TP 4',
          visible: true,
          color: '#0E0',
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
          },
        },
      ],
    },
    {
      type: 'board',
      board: '2',
      title: 'Courses',
      notes: '',
      postits: [
        {
          type: 'pain',
          board: '2',
          title: 'Pain',
          text: 'Acheter une Banette',
          visible: true,
          color: '#eeed38',
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
          },
        },
      ],
    },
  ],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BOARD: {
      return {
        ...state,
      };
    }
    case DELETE_BOARD:
      return null;
    case SET_BOARD:
      return {
        ...state,
        currentBoard: action.payload,
        posIndex: 0,
      };
    case NEXT_BOARD:
      return {
        ...state,
        index: state.index + 1 === state.nbBoards ? 0 : state.index + 1,
        currentBoard: state.currentBoard + 1 === state.nbBoards ? 0 : state.currentBoard + 1,
        posIndex: 0,
      };
    case NEXT_POSTIT: {
      return {
        ...state,
        posIndex: state.posIndex + 1 === state.boards[state.currentBoard].postits.length
          ? 0 : state.posIndex + 1,
      };
    }
    case PREV_POSTIT:
      return {
        ...state,
        posIndex: state.posIndex + 1 === 0
          ? state.boards[state.currentBoard].postits.length : state.posIndex - 1,
      };
    case ADD_DRAW_POINTS:
    {
      return {
        ...state,
        boards: Array.from(state.boards, (board, i) => {
          if (i !== state.currentBoard) {
            return board;
          }
          return {
            ...board,
            postits: Array.from(board.postits, (pos, j) => {
              if (j !== state.posIndex) {
                return pos;
              }
              return {
                ...pos,
                drawing: {
                  clickX: state.boards[state.currentBoard].postits[state.posIndex]
                    .drawing.clickX.concat(action.payload.clickX),
                  clickY: state.boards[state.currentBoard].postits[state.posIndex]
                    .drawing.clickY.concat(action.payload.clickY),
                  clickDrag: state.boards[state.currentBoard].postits[state.posIndex]
                    .drawing.clickDrag.concat(action.payload.clickDrag),
                },
              };
            }),
          };
        }),
      };
    }
    case RESET_DRAW_POINTS:
      return {
        ...state,
        boards: Array.from(state.boards, (board, i) => {
          if (i !== state.currentBoard) {
            return board;
          }
          return {
            ...board,
            postits: Array.from(board.postits, (pos, j) => {
              if (j !== state.posIndex) {
                return pos;
              }
              return {
                ...pos,
                drawing: {
                  clickX: [],
                  clickY: [],
                  clickDrag: [],
                },
              };
            }),
          };
        }),
      };
    default:
      return state;
  }
}

export default rootReducer;
