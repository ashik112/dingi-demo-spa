/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Dropdown,
  DropdownButton,
  Form,
  Image,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { BoxArrowLeft, PersonBoundingBox } from 'react-bootstrap-icons';
import logo from '../../../assets/dingi.png';
import history from '../../../utils/history';
import historyRoutes from '../../../routing/historyRoutes';

const TopNavBar = ({
  showSideNav, fullName, username, logOut,
}) => (
  <Navbar fixed="top" style={{ height: 55, opacity: 0.8 }} bg="warning" variant="light">
    <Navbar.Brand>
      <Image width={20} src={logo} fluid />
      &nbsp;Dingi
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link onClick={() => !showSideNav && history.push(historyRoutes.dashboard.sales)}>Dashboard</Nav.Link>
      <Nav.Link onClick={() => history.push(historyRoutes.items)}>Items</Nav.Link>
    </Nav>
    <Form inline>
      <>
        <DropdownButton
          alignRight
          variant="warning"
          title={(
            <span>
              <PersonBoundingBox />
              &nbsp;&nbsp;
              <span>{fullName}</span>
            </span>
          )}
        >
          <Dropdown.Header>
            Signed in as&nbsp;
            <span className="text-danger font-weight-bold">{username}</span>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logOut} className="text-danger">
            <BoxArrowLeft />
            &nbsp;&nbsp;Log Out
          </Dropdown.Item>
        </DropdownButton>
      </>
    </Form>
  </Navbar>
);

export default TopNavBar;
