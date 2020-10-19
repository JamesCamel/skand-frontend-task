import React from "react";
import { Formik, Form, Field } from 'formik';
import { requestUpdateUserDetail } from './../actions/UserList'
import FormFields from './../components/FormFields'
import {
  makeStyles,
  Container,
  CssBaseline,
  Typography,
  Grid,
  Avatar
} from '@material-ui/core';

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

            {({ submitForm, isSubmitting }) => (
              <FormFields submitForm={submitForm} isSubmitting={isSubmitting}/>
            )}
          </Formik>
        </div>
      </Grid>
    </Container>
  )

};


export default EditForm
