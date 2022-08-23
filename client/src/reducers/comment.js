import { LOAD_MORE_COMMENTS, GET_COMMENTS_COUNT, CREATE_NEW_COMMENT } from '../actions/types';

const initialState = {
  currentComments: [],
  commentsCount: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_MORE_COMMENTS:
      return {
        ...state,
        currentComments: [...state.currentComments, ...payload],
      };
    case GET_COMMENTS_COUNT:
      return {
        ...state,
        commentsCount: payload,
      };
    case CREATE_NEW_COMMENT:
      return {
        ...state,
        currentComments: [payload, ...state.currentComments],
      };
    default:
      return state;
  }
}
