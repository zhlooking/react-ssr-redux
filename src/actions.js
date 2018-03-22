import axios from 'axios';

// ACTIONS
const FETCH_HOT_POSTS_REQUEST = "FETCH_HOT_POSTS_REQUEST";
const FETCH_HOT_POSTS_SUCCESS = "FETCH_HOT_POSTS_SUCCESS";
const FETCH_HOT_POSTS_FAILURE = "FETCH_HOT_POSTS_FAILURE";

// REDUCERS
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_HOT_POSTS_SUCCESS:
      return { ...state, posts: action.payload }

    default:
      return state;
  }
}

// ACTION CREATORS
const requestPosts = () => ({ type: FETCH_HOT_POSTS_REQUEST })
const receivedPosts = (posts) => ({ type: FETCH_HOT_POSTS_SUCCESS, payload: posts })
const postsError = () => ({ type: FETCH_HOT_POSTS_FAILURE })

export const fetchPosts = (url) => (dispatch, getState) => {
  dispatch(requestPosts());
  return axios.get(url)
    .then(resp => resp.data)
    .then(data => dispatch(receivedPosts(data)))
    .catch(err => dispatch(postsError(err)))
}

// export const fetchP = () => {
//   return (dispatch, getState) => {
//     dispatch(requestPosts());
//     return axios.get('https://www.v2ex.com/api/topics/hot.json')
//       .then(resp => resp.data)
//       .then(data => dispatch(receivedPosts(data)))
//       .catch(err => dispatch(postsError(err)))
//   }
// }
