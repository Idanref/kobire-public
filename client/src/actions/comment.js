import axios from 'axios';
import { LOAD_MORE_COMMENTS, GET_COMMENTS_COUNT, CREATE_NEW_COMMENT } from './types';

// load more comments
export const loadMoreComments = (skip, limit) => async (dispatch) => {
  try {
    const res = await axios.get(`/comments?limit=${limit}&skip=${skip}`);

    dispatch({
      type: LOAD_MORE_COMMENTS,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
  }
};

// get comments count
export const getCommentsCount = () => async (dispatch) => {
  try {
    const res = await axios.get('/comments/count');

    dispatch({
      type: GET_COMMENTS_COUNT,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
  }
};

// create new comment
export const createNewComment = (newComment) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/comments', newComment, config);

    dispatch({
      type: CREATE_NEW_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
  }
};
