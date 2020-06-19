import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import {Navbar, Nav, Button, Form, Image} from 'react-bootstrap';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import authActions from '../../redux/reducers/Authentication/authActions';
import AuthenticatedRouting from '../../routing/AuthenticatedRouting';
import Dashboard from '../Dashboard';
import logo from '../../assets/dingi.png';
import Sales from '../Dashboard/Sales';
import Customers from '../Dashboard/Customers';
import history from '../../utils/history';
import styled from 'styled-components';
import { GraphUp, PeopleFill } from 'react-bootstrap-icons';

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0;
    margin-left: ${props => (props.expanded ? 140 : ((props.side && 64) || 0))}px;
`;

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }

  onToggle = (expanded) => {
    this.setState({ expanded: expanded });
  };

  render() {
    const { logOut, location } = this.props;
    const showSideNav = location.pathname.includes('dashboard') || location.pathname.includes('sales') || location.pathname.includes('customers');
    console.log(location);
    const { expanded } = this.state;
    return(
      <>
        {/**/}
        <Navbar style={{ height: 55 }} bg="warning" variant="light">
          <Navbar.Brand href="/dashboard/sales"><Image width={20} src={logo} fluid/> Dingi</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard/sales">Dashboard</Nav.Link>
            <Nav.Link href="/items">Items</Nav.Link>
          </Nav>
          <Form inline>
            <Button onClick={logOut} variant="info">Log Out</Button>
          </Form>
        </Navbar>
        {
          showSideNav && (
            <SideNav
              style={{
                background: '#ffc107',
                marginTop: 55,
              }}
              onSelect={(selected) => {
                const to = '/' + selected;
                if (location.pathname !== to) {
                  history.push(to);
                }
              }}
              onToggle={this.onToggle}
            >
              <SideNav.Toggle className="text-dark" />
              <SideNav.Nav defaultSelected="dashboard/sales">
                <NavItem eventKey="dashboard/sales">
                  <NavIcon>
                    <GraphUp className="text-dark" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText className="text-dark">
                    <span className="text-dark">Sales</span>
                  </NavText>
                </NavItem>
                <NavItem eventKey="dashboard/customers">
                  <NavIcon>
                    <PeopleFill className="text-dark" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText className="text-dark">
                    <span className="text-dark">Customers</span>
                  </NavText>
                </NavItem>
              </SideNav.Nav>
            </SideNav>
          )
        }
        <Main expanded={expanded} side={showSideNav}>
          <Switch
            checkedChildren="Dark"
            unCheckedChildren="Light"
            location={location}
          >
            <AuthenticatedRouting component={Dashboard} path="/dashboard" exact />
            <AuthenticatedRouting component={Sales} path="/dashboard/sales" exact />
            <AuthenticatedRouting component={Customers} path="/dashboard/customers" exact />
          </Switch>
        </Main>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(
    authActions.logout(),
  ),
});
export default connect(null, mapDispatchToProps)(Layout);
