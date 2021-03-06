/* eslint-disable react/prop-types,react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import historyRoutes from './historyRoutes';

/**
 * * [Conditional rendering with Authentication]
 */
function UnauthenticatedRouting({ component: Component, authReducer, ...rest }) {
  return (
    <>
      {
        !authReducer.token && (
          <Route
            {...rest}
            render={(props) => (
              <Component {...props} />
            )}
          />
        )
      }
      {
        authReducer.token && (
          <Redirect exact from={historyRoutes.login} to={historyRoutes.dashboard.sales} />
        )
      }
    </>
  );
}

UnauthenticatedRouting.propTypes = {
  authReducer: PropTypes.shape(),
};

UnauthenticatedRouting.defaultProps = {
  authReducer: {
    token: null,
    company: {},
  },
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, null)(UnauthenticatedRouting);
