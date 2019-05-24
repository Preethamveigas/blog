import axios from "axios";
import { ENDPOINT, LIKEEND, COMMENTEND } from "../api/api";
import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  CHECK_LIKE_SERVICE,
  CHECK_COMMENT_SERVICE
} from "./types";

// Check server comment

export const checkLikeService = DATA => dispatch => {
  axios
    .get(`${LIKEEND}api/posts/`)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: CHECK_LIKE_SERVICE,
          payload: true
        });
      } else if (res === undefined) {
        dispatch({
          type: CHECK_LIKE_SERVICE,
          payload: null
        });
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Check server comment

export const checkCommentService = () => dispatch => {
  axios
    .get(`${COMMENTEND}api/posts/`)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: CHECK_COMMENT_SERVICE,
          payload: true
        });
      }
      if (res === undefined) {
        dispatch({
          type: CHECK_COMMENT_SERVICE,
          payload: null
        });
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());

  axios
    .post(`${ENDPOINT}api/posts/add`, postData)
    .then(res => {
      if (res.status === 2000) {
        dispatch({
          type: ADD_POST,
          payload: res.data
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());

  axios
    .get(`${ENDPOINT}api/posts`)
    .then(res => {
      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: GET_POSTS,
          payload: res.data
        });
      }
    })
    .catch(err => {
      if (err.response !== undefined) {
        dispatch({
          type: GET_POSTS,
          payload: err.response
        });
      }
      err.response = "Network err";
      dispatch({
        type: GET_POSTS,
        payload: err
      });
    });
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`${ENDPOINT}/api/posts/${id}`)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: GET_POST,
          payload: res.data
        });
      }
    })
    .catch(err => {
      if (err.response !== undefined) {
        dispatch({
          type: GET_POST,
          payload: null
        });
      } else {
        err.response = "Network Error";
        dispatch({
          type: GET_POST,
          payload: null
        });
      }
    });
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`${ENDPOINT}/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err => {
      if (err.response !== undefined) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      } else {
        err.response = "Network error";
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

// Add Like
export const addLike = (id, LikeData) => dispatch => {
  axios
    .post(`${ENDPOINT}api/posts/like/${String(id)}`, LikeData)
    .then(res => dispatch(getPosts()))
    .catch(err => {
      if (err.response !== undefined) {
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
      } else {
        err.response = "Network Error";
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
      }
    });
};

// Remove Like
export const removeLike = (id, LikeData) => dispatch => {
  axios
    .post(`${ENDPOINT}api/posts/unlike/${id}`, LikeData)
    .then(res => dispatch(getPosts()))
    .catch(err => {
      if (err.response !== undefined) {
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
      } else {
        err.response = "Network Error";
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
      }
    });
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${ENDPOINT}api/posts/comment/${String(postId)}`, commentData)
    .then(res => dispatch(getPosts()))
    .catch(err => {
      if (err.response !== undefined) {
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
      } else {
        err.response = "Network Error";
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
      }
    });
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`${ENDPOINT}api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response !== undefined) {
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
      } else {
        err.response = "Network Error";
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
      }
    });
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
