import React from "react";
import { Formik, Form, Field } from 'formik';
import { requestCreateUser, requestUpdateUserDetail } from './../actions/UserList'
import {
  Button,
  LinearProgress,
  FormControlLabel,
} from '@material-ui/core';
import {
  TextField,
  Switch,
} from 'formik-material-ui';

import Box from '@material-ui/core/Box';
import { useDispatch } from "react-redux";
const CreateForm = (props) => {
  const dispatch = useDispatch()
  return (
    <Formik
      initialValues={{
        email: '',
        active: false,
        first_name: '',
        last_name: '',
        slack_username: '',
        jobs_count: 0
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

        if (!values.first_name) {
          errors.first_name = 'Required'
        }
        if (!values.last_name) {
          errors.last_name = 'Required'
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        dispatch(requestCreateUser(values))
        props.history.push('/')
      }}
    >
      {({ submitForm, isSubmitting, touched, errors }) => (
        <Form>
          <Box margin={1}>
            <Field
              component={TextField}
              type="name"
              label="First Name"
              name="first_name"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="name"
              label="Last Name"
              name="last_name"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="name"
              label="Slack Name"
              name="slack_username"
            />
          </Box>
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
              type="number"
              label="Jobs Count"
              name="jobs_count"
            />
          </Box>
          <Box margin={1}>
            <FormControlLabel
              control={
                <Field component={Switch} type="checkbox" name="active" />
              }
              label="Active"
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
        </Form>
      )}
    </Formik>
  )
};


export default CreateForm
