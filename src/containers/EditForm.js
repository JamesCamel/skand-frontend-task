import React from "react";
import { Formik, Form, Field, withFormik } from 'formik';
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
import { useDispatch, useSelector } from "react-redux";
import { requestUserDetail } from "../actions/User";
const EditForm = (props) => {
  const userId = props.match.params.id
  const dispatch = useDispatch()
  const user = useSelector(state => state.User)
  React.useEffect(() => {
    dispatch(requestUserDetail(userId))
  }, [])

  return (
    <Formik
      initialValues={{
        email: user.email || '',
        active: user.active,
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        slackName: user.slack_username || '',
        jobsCount: user.jobs_count || 0
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

        if (!values.firstName) {
          errors.firstName = 'Required'
        }
        if (!values.lastName) {
          errors.lastName = 'Required'
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting, touched, errors }) => (
        <Form>
          <Box margin={1}>
            <Field
              component={TextField}
              type="name"
              label="First Name"
              name="firstName"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="name"
              label="Last Name"
              name="lastName"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="name"
              label="Slack Name"
              name="slackName"
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
              name="jobsCount"
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


export default EditForm
