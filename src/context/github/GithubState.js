import {
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SEARCH_USERS,
  SET_LOADING
} from '../types';
import React, { useReducer } from 'react';

import GithubContext from './githubContext';
import githubReducer from './githubReducer';
import axios from 'axios';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.githubClientId}&client_secret=${process.env.githubClientSecret}`
    );
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  // Get Users

  const getUser = async username => {
    setLoading(true);
    console.log(username);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.githubClientId}&client_secret=${process.env.githubClientSecret}`
    );

    dispatch({ type: GET_USER, payload: res.data });
  };

  // Get Repos
  // get users repos
  const getUserRepos = async username => {
    setLoading(true);
    console.log(username);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.githubClientId}&client_secret=${process.env.githubClientSecret}`
    );

    dispatch({ type: GET_REPOS, payload: res.data });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
