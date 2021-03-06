import React from 'react';
import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from './utils/history';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import UnauthenticatedRouting from './routing/UnauthenticatedRouting';
import LoginPage from './containers/Login/LoginPage';
import LayoutWrapper from './containers/LayoutWrapper';

// eslint-disable-next-line react/prop-types
const App = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <Switch>
          <UnauthenticatedRouting exact path="/" component={LoginPage} />
          <UnauthenticatedRouting exact path="/login" component={LoginPage} />
          <LayoutWrapper />
        </Switch>
      </Router>
    </PersistGate>
    <ToastContainer />
  </Provider>
);
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, null)(App);
