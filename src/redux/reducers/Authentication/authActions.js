import authActionTypes from './authActionTypes';
import historyRoutes from '../../../routing/historyRoutes';
import history from '../../../utils/history';
import { store} from '../../store';
import authenticationService from '../../../services/authenticationService';
import storageService from '../../../services/storageService';

const login = (credentials) => {
  function start(params) {
    return { type: authActionTypes.LOGIN_REQUEST, payload: params };
  }

  function success(user) {
    return { type: authActionTypes.LOGIN_SUCCESS, payload: user };
  }

  function failure(error) {
    return { type: authActionTypes.LOGIN_FAILURE, payload: error };
  }

  return async (dispatch) => {
    const { username, password } = credentials;
    await dispatch(start({ username, password }));
    await authenticationService.login(credentials)
      .then(async (res) => {
        if (res.data && res.data.user) {
          await dispatch(success(res.data));
          history.push(historyRoutes.dashboard.base);
        }
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };
};

const stopLoading = () => (dispatch) => {
  dispatch({ type: authActionTypes.LOGIN_LOADING_STOP });
};

/**
 * Log Out User
 * @returns {function(...[*]=)}
 */
const logout = () => (dispatch) => {
  storageService.remove('callbackLink');
  authenticationService.logout(dispatch);
};

const authActions = {
  login,
  logout,
  stopLoading,
};

export default authActions;
