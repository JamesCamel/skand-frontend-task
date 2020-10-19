import React from "react";
import { Formik, Form, Field } from 'formik';
import { requestUpdateUserDetail } from './../actions/UserList'
import {
  Button,
  LinearProgress,
  FormControlLabel,
  makeStyles,
  Container,
  CssBaseline,
  Typography,
  Grid,
  Avatar
} from '@material-ui/core';
import {
  TextField,
  Switch,
} from 'formik-material-ui';

import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from "react-redux";
import { requestUserDetail } from "../actions/User";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  outerGrid: {
    spacing: 0,
    direction: "column",
    alignItems: "center",
    justify: "center",
    minHeight: '70vh'
  }
}));

const EditForm = (props) => {
  const classes = useStyles();
  const userId = props.match.params.id
  const dispatch = useDispatch()
  const user = useSelector(state => state.User)
  React.useEffect(() => {
    dispatch(requestUserDetail(userId))
  }, [])

  return (
    <Container component="main" maxWidth="xs" >
      <Grid container className={classes.outerGrid}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit
          </Typography>
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

              <Form className={classes.form}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      type="name"
                      label="First Name"
                      name="first_name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      type="name"
                      label="Last Name"
                      name="last_name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      type="name"
                      label="Slack Name"
                      name="slack_username"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      type="number"
                      label="Jobs Count"
                      name="jobs_count"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      type="email"
                      label="Email"
                      name="email"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={
                        <Field component={Switch} type="checkbox" name="active" />
                      }
                      label="Active"
                    />
                  </Grid>
                  {isSubmitting && <LinearProgress />}
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}

                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </Container>
  )

};


export default EditForm
