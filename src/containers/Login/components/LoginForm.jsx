/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, Form, InputGroup, Spinner,
} from 'react-bootstrap';
import { Field, Formik } from 'formik';
import { Asterisk, BoxArrowRight, PersonFill } from 'react-bootstrap-icons';

const LoginForm = ({ loading, onLogIn }) => (
  <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    onSubmit={(values) => {
      onLogIn({ ...values });
    }}
  >
    {({ handleSubmit }) => (
      <Form>
        <Field
          name="username"
        >
          {({ field }) => (
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="text-warning"><PersonFill /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="text" placeholder="Enter your username" value={field.value} onChange={field.onChange} />
              </InputGroup>
            </Form.Group>
          )}
        </Field>
        <Field
          name="password"
        >
          {({ field }) => (
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="text-warning"><Asterisk /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control autoComplete="on" type="password" placeholder="Enter your password" value={field.value} onChange={field.onChange} />
              </InputGroup>
            </Form.Group>
          )}
        </Field>
        <Button disabled={loading} variant="warning" className="text-light" type="button" onClick={handleSubmit}>
          {
              loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )
            }
          { !loading && <BoxArrowRight />}
          &nbsp;&nbsp;Log In
        </Button>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
