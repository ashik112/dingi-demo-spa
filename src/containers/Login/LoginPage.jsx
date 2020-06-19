import React from 'react';
import {Form, Button, Container, Row, Col, Card, Image} from 'react-bootstrap';
import { Formik, Field } from 'formik';
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
            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ handleSubmit, isSubmitting, getFieldProps, handleChange, handleBlur, values }) => {
                return (
                  <Form>
                    <Field
                      name="username"
                      render={({field, formProps}) => (
                        <Form.Group controlId="username">
                          <Form.Label>Username</Form.Label>
                          <Form.Control type="text" placeholder="Enter your username" value={field.value} onChange={field.onChange} />
                        </Form.Group>
                      )}
                    />
                    <Field
                      name="password"
                      render={({field, formProps}) => (
                        <Form.Group controlId="password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Enter your password" value={field.value} onChange={field.onChange} />
                        </Form.Group>
                      )}
                    />
                    <Button variant="warning" className="text-light" type="button" onClick={handleSubmit}>
                      Log In
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
