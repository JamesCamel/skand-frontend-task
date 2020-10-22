import React from "react";
import { Formik } from 'formik';
import FormFields from './../components/FormFields'
import { requestCreateUser } from './../actions/UserList'
import { makeStyles, Container, CssBaseline, Typography, Grid, Avatar } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useDispatch } from "react-redux";

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
  outerGrid: {
    spacing: 0,
    direction: "column",
    alignItems: "center",
    justify: "center",
    minHeight: '70vh'
  }
}));

const CreateForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch()

  return (
    <Container component="main" maxWidth="xs" >
      <Grid container className={classes.outerGrid}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add an user
        </Typography>
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
            {({ submitForm, isSubmitting }) => (
              <FormFields submitForm={submitForm} isSubmitting={isSubmitting} />
            )}
          </Formik>
        </div>
      </Grid>
    </Container>
  )
};


export default CreateForm
