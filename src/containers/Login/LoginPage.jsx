/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import logo from '../../assets/dingi.png';
import './LoginPage.scss';
import authActions from '../../redux/reducers/Authentication/authActions';
import LoginForm from './components/LoginForm';

class LoginPage extends Component {
  componentDidMount() {
    const { stopLoading } = this.props;
    stopLoading();
  }

  render() {
    const { authReducer, onLogIn } = this.props;
    const { loading } = authReducer;
    return (
      <Container style={{ height: '100vh' }}>
        <div className="background-image" />
        <Row style={{ blur: '0 !important' }} className="h-100 justify-content-center align-items-center content">
          <Col md={4}>
            <Card border="warning">
              <Card.Body>
                <div className="text-center mb-5">
                  <Image src={logo} rounded />
                  <br />
                  <h1 className="text-warning">Dingi</h1>
                </div>
                <LoginForm loading={loading} onLogIn={onLogIn} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { authReducer } = state;
  return {
    authReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogIn: (credentials) => dispatch(
    authActions.login(
      credentials,
    ),
  ),
  stopLoading: () => dispatch(authActions.stopLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
