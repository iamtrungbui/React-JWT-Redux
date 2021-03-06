import axios from 'axios';
import { store } from '../store/index';
import Auth from '../services/auth';

import { setAccessToken, logout, redirectToLogin } from '../actions/auth';
import { setLoading } from '../actions/loading';
import { getAccessToken, getRefreshToken } from '../reducers/auth';

const onSuccess = (response) => {
  store.dispatch(setLoading(false));

  return response;
}

const onError = (error) => {
  switch (error.response.status) {
    case 401:
      const originalRequest = error.config;
      if (!originalRequest._retry && error.response.data === 'Token Expired') {
        originalRequest._retry = true;
        const refreshToken = getRefreshToken(store.getState());
        return Auth.refresh(refreshToken).then((response) => {
            store.dispatch(setAccessToken(response.token.access));
            return axios(originalRequest);
          }).catch((error) => {
            store.dispatch(logout());
            store.dispatch(redirectToLogin());
            return Promise.reject(error);
          });
      } 
    break;
    default:
    break;
  }

  store.dispatch(setLoading(false));
  return Promise.reject(error); 
}

const beforeRequestSuccess = (config) => {
  const accessToken = getAccessToken(store.getState());
  store.dispatch(setLoading(true));
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
}

const beforeRequestError = (error) => {
  store.dispatch(setLoading(false));
  return Promise.reject(error);
}

export { onSuccess, onError, beforeRequestSuccess, beforeRequestError };