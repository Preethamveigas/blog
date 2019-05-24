import axios from "axios";
import { ENDPOINT } from "../api/api";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Login - Get User Token
export const loginUser = userData => dispatch => {
  console.log(`${ENDPOINT}api/users/login`, userData);
  if (userData === null) {
    userData = 1;
  }
  axios
    .get(`${ENDPOINT}api/users/login/${userData}`)
    .then(res => {
      console.log("----------------------RES------------------");
      console.log(res);
      const token = {
        id: res.data._id,
        name: res.data.name,
        avatar: res.data.avatar,
        email: res.data.email
      };

      // Set token to ls
      if (localStorage.getItem("currentUser") === "undefined") {
        localStorage.removeItem("currentUser");
      }
      localStorage.setItem("currentUser", JSON.stringify(token));
      // Set current user
      console.log("dispatch Current User");

      dispatch(setCurrentUser(token));
    })
    .catch(err => {
      console.log("----------------------RES------------------");
      if (err.response !== undefined) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response
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

// Set logged in user
export const setCurrentUser = decoded => {
  console.log("setting Current User");
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("currentUser");
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
