import React from 'react';
import {Form, Button, Container, Row, Col, Card, Image} from 'react-bootstrap';
import logo from '../../assets/dingi.png';
import './LoginPage.scss';

const LoginPage = () => (
  <Container style={{ height: '100vh' }}>
    <div className="background-image" />
    <Row style={{ blur: '0 !important' }} className="h-100 justify-content-center align-items-center content">
      <Col md={4}>
        <Card border="warning">
          <Card.Body>
            <div className="text-center mb-5">
              <Image src={logo} rounded />
              <br/>
              <h1 className="text-warning">Dingi</h1>
            </div>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
                {/*<Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>*/}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
