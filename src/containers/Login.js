import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress} from '@material-ui/core';
import {TextField} from 'formik-material-ui';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import axios from 'axios';

const isLogin = () => {
  return localStorage.getItem('token') ? true : false
}

const Login = (props) => {
  const [ snackBarOpen, setSnackBarOpen ] = useState(false)
  if (isLogin()) {
    props.history.push('/')
  } 
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      enableReinitialize={true}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Required'
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        try {
          const response = await axios.post('http://localhost:3000/api/v2/users/tokens', {
            email: values.email,
            password: values.password
          });
          if (response) {
            const token = response.headers.authorization;
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'))
            props.history.push('/')
          }
        } catch (e) {
          console.log(e)
          setSnackBarOpen(prev => !prev)
        }
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Box margin={1}>
            <Field
              component={TextField}
              type="email"
              label="Email"
              name="email"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="password"
              label="Password"
              name="password"
            />
          </Box>
          {isSubmitting && <LinearProgress />}
          <Box margin={1}>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Box>
          <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={() => setSnackBarOpen(prev => !prev)}>
            <Alert variant="filled"  severity="error">
                Incorrect email or password!
            </Alert>
          </Snackbar>
        </Form>
      )}
      
    </Formik>
  )
}

export default Login
