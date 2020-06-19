import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthenticatedRouting from './AuthenticatedRouting';
import UnauthenticatedRouting from './UnauthenticatedRouting';
// import Layout from '../containers/Layout';
//import NotFound from '../shared/NotFound';
import historyRoutes from './historyRoutes';
import Dashboard from '../containers/Dashboard';
import Sales from '../containers/Dashboard/Sales';
import Customers from '../containers/Dashboard/Customers';
import LoginPage from '../containers/Login/LoginPage';
// import {Container} from 'react-bootstrap';

const wrappedRoutes = () => (
  <>
    {/*<Layout />*/}
    <>
      <AuthenticatedRouting exact path="/dashboard" component={Dashboard}  />
      <Route path={historyRoutes.dashboard.base}>
        <Switch>
          <AuthenticatedRouting exact path={historyRoutes.dashboard.sales} component={Sales} />
          <AuthenticatedRouting exact path={historyRoutes.dashboard.customers} component={Customers} />
        </Switch>
      </Route>
    </>
  </>
);

const Routers = () => (
  <>
    {/* <main> */}
    <Switch>
      <UnauthenticatedRouting exact path="/" component={LoginPage} />
      <UnauthenticatedRouting exact path={historyRoutes.login} component={LoginPage} />
      <Route path="/" component={wrappedRoutes} />
      {/*<Route component={NotFound} />*/}
    </Switch>
    {/* </main> */}
  </>
);

export default Routers;
