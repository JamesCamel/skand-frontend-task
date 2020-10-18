import React from "react";
import { Formik, Form, Field } from 'formik';
import { requestUpdateUserDetail } from './../actions/UserList'
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
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        slack_username: user.slack_username || '',
        jobs_count: user.jobs_count || 0
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
        const updatedDetail = {
          ...values,
          id: userId
        }
        console.log(updatedDetail)
        dispatch(requestUpdateUserDetail(updatedDetail))
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


export default EditForm
