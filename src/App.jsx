import React from 'react';
import {connect, Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router, Switch } from 'react-router-dom';
import history from './utils/history';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import UnauthenticatedRouting from './routing/UnauthenticatedRouting';
import LoginPage from './containers/Login/LoginPage';
import Layout from './containers/Layout';
import {ToastContainer} from 'react-toastify';

const App = ({store, persistor}) => {
  return (
    <Provider store={store}>
      {/* loading can be null */}
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Switch>
            <UnauthenticatedRouting exact path="/" component={LoginPage} />
            <UnauthenticatedRouting exact path="/login" component={LoginPage} />
            <Layout />
          </Switch>
        </Router>
      </PersistGate>
      <ToastContainer />
    </Provider>
  );
}
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default  connect(mapStateToProps, null)(App);
