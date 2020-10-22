import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, makeStyles, Container, CssBaseline, Typography, Grid, Avatar } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
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

const isLogin = () => {
  return localStorage.getItem('token') ? true : false
}

const Login = (props) => {
  const classes = useStyles();
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  if (isLogin()) {
    props.history.push('/')
  }
  return (
    <Container component="main" maxWidth="xs" >
      <Grid container className={classes.outerGrid}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
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
                const response = await axios.post(`${window.location.protocol}//${window.location.host}/api/v2/users/tokens`, {
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
              <Form className={classes.form}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      type="email"
                      label="Email"
                      name="email"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      type="password"
                      label="Password"
                      name="password"
                      fullWidth
                    />
                  </Grid>
                  {isSubmitting && <LinearProgress />}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                      fullWidth
                    >
                      Sign in
                </Button>
                  </Grid>
                  <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={() => setSnackBarOpen(prev => !prev)}>
                    <Alert variant="filled" severity="error">
                      Incorrect email or password!
                </Alert>
                  </Snackbar>
                </Grid>
              </Form>
            )}

          </Formik>
        </div>
      </Grid>
    </Container>
  )
}

export default Login
