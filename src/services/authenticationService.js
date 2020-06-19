/* eslint-disable no-undef,max-len,no-unused-vars */
import { apiUrl } from '../constants';
import storageService from './storageService';
import history from '../utils/history';
import historyRoutes from '../routing/historyRoutes';
import { store} from '../redux/store';
import authActionTypes from '../redux/reducers/Authentication/authActionTypes';
import axios from '../utils/axios';

/**
 * * [Login request for User]
 * @returns {Promise<any>}
 * @param params
 */
function login(params) {
  return axios.post(
    `${apiUrl}/auth/login`, params,
  );
}


/**
 * * [Logout and Go To Login Page]
 * ! clear all items form local storage
 */
function logout() {
  // remove user from local storage to log user out
  // storageService.remove(storageService.keys.user);
  // remove company id from local storage
  // storageService.remove(storageService.keys.companyID);
  try {
    store.dispatch({ type: authActionTypes.LOGOUT });
    // dispatch({ type: companyActionTypes.CLEAR });
    const { authReducer: { token } } = store.getState();
    if (token) {
      store.dispatch({ type: 'RESET_APP' });
      storageService.remove('persist:dingi');
    }
    history.push(historyRoutes.login);
  } catch (e) {
    // handle error
  }
}

const authenticationService = {
  login,
  logout,
};

export default authenticationService;
