import React from 'react';
import history from '../../../utils/history';
import SideNav, {NavIcon, NavItem, NavText} from '@trendmicro/react-sidenav';
import {GraphUp, PeopleFill} from 'react-bootstrap-icons';

const SideNavBar = ({ onToggle, location }) => (
  <SideNav
    style={{
      background: '#ffc107',
      marginTop: 55,
      position: 'fixed',
    }}
    onSelect={(selected) => {
      const to = '/' + selected;
      if (location.pathname !== to) {
        history.push(to);
      }
    }}
    onToggle={onToggle}
  >
    <SideNav.Toggle className="text-dark" />
    <SideNav.Nav defaultSelected={location.pathname.includes('customers') ? 'dashboard/customers' : 'dashboard/sales'}>
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

export default SideNavBar;
