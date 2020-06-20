/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import styled from 'styled-components';
import authActions from '../../redux/reducers/Authentication/authActions';
import AuthenticatedRouting from '../../routing/AuthenticatedRouting';
import ItemsPage from '../Items/ItemsPage';
import SalesPage from '../Dashboard/Sales/SalesPage';
import CustomersPage from '../Dashboard/Customers/CustomersPage';
import TopNavBar from './components/TopNavBar';
import SideNavBar from './components/SideNavBar';
import NotFound from '../../shared/NotFound';

const Main = styled.main`
    position: relative;
    overflow-y: hidden;
    overflow-x: ${(props) => ((props.side && 'hidden') || 'auto')};
    transition: all .15s;
    padding: 0;
    margin-left: ${(props) => (props.expanded ? 140 : ((props.side && 64) || 0))}px;
    margin-top: 55px;
`;

class LayoutWrapper extends Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
    this.state = {
      expanded: false,
    };
  }

  onToggle = (expanded) => {
    this.setState({ expanded });
  };

  render() {
    const { logOut, location, authReducer: { user: { username, full_name } } } = this.props;
    const showSideNav = location.pathname.includes('dashboard') || location.pathname.includes('sales') || location.pathname.includes('customers');
    const { expanded } = this.state;
    return (
      <>
        <TopNavBar fullName={full_name} showSideNav={showSideNav} username={username} logOut={logOut} />
        {
          showSideNav && (
            <SideNavBar location={location} onToggle={this.onToggle} />
          )
        }
        <Main expanded={expanded} side={showSideNav}>
          <Switch
            checkedChildren="Dark"
            unCheckedChildren="Light"
            location={location}
          >
            <AuthenticatedRouting component={ItemsPage} path="/items" exact />
            <AuthenticatedRouting component={SalesPage} path="/dashboard/sales" exact />
            <AuthenticatedRouting component={CustomersPage} path="/dashboard/customers" exact />
            <AuthenticatedRouting component={NotFound} />
          </Switch>
        </Main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(
    authActions.logout(),
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(LayoutWrapper);
