import { store} from '../redux/store';
import authActionTypes from '../redux/reducers/Authentication/authActionTypes';
import history from './history';
import historyRoutes from '../routing/historyRoutes';
import { sleep } from './sleep';
import {toast} from 'react-toastify';

export const errorType = {
  single: 1,
  authentication: 2,
  form: 3,
  unknown: 4,
};

const handleGlobally = (error) => {
  switch (error.type) {
    case errorType.authentication:
      toast.error("Authentication Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (error.message !== 'Access Denied') {
        sleep(500).then(() => {
          try {
            store.dispatch({ type: authActionTypes.LOGOUT });
            const { authReducer: { token } } = store.getState();
            if (token) {
              store.dispatch({ type: 'RESET_APP' });
              //storageService.remove('persist:dingi');
            }
            history.push(historyRoutes.login);
          } catch (e) {
            // handle error
          }
        });
      }
      break;
    case errorType.unknown:
      // showNotification('error', error.statusText, error.message);
      break;
    case errorType.single:
      // showAlert('error', error.message);
      break;
    default:
      // showNotification('error', 'Something went wrong!', 'Server was unable to process the request.');
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const handleAjaxError = (error) => {
  try {
    const { status, data: { code, message } } = error;
    if (status === 401 || code === 401) {
      const res = {
        message: 'Authentication Required',
        statusText: message,
        code: 401,
        type: errorType.authentication,
        handleGlobally: (err) => handleGlobally(err),
      };
      handleGlobally(res);
      return res;
    }
  } catch (err) {
    // handle error
  }
  try {
    if (error.data.errors.children) {
      const formErrors = {};
      // eslint-disable-next-line no-restricted-syntax,no-unused-vars
      for (const [key, value] of Object.entries(error.data.errors.children)) {
        value.errors.forEach((err) => {
          if (formErrors[key]) {
            formErrors[key].push(err);
          } else {
            formErrors[key] = [];
            formErrors[key].push(err);
          }
        });
      }
      return {
        type: errorType.form,
        errors: formErrors,
        handleGlobally: (err) => handleGlobally(err),
      };
    } if (error && error.data && error.data.message) {
      return {
        type: errorType.single,
        statusText: error.statusText,
        message: error.data.message,
        handleGlobally: (err) => handleGlobally(err),
      };
    }
    return {
      type: errorType.unknown,
      statusText: 'Something went wrong!',
      message: 'Server was unable to process the request.',
    };
  } catch (e) {
    if (error && error.data && error.data.message) {
      return {
        type: errorType.single,
        statusText: error.statusText,
        message: error.data.message,
        handleGlobally: (err) => handleGlobally(err),
      };
    }
    return {
      type: errorType.unknown,
      statusText: 'Something went wrong!',
      message: 'Server was unable to process the request.',
      handleGlobally: (err) => handleGlobally(err),
    };
  }
};
