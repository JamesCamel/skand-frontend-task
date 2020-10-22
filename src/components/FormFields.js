import React from "react";
import { Form, Field } from 'formik';
import {
  Button,
  LinearProgress,
  FormControlLabel,
  makeStyles,
  Grid
} from '@material-ui/core';
import {
  TextField,
  Switch,
} from 'formik-material-ui';

const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
  }));


const FormFields = (props) => {
    const submitForm = props.submitForm
    const isSubmitting = props.isSubmitting
    const classes = useStyles();
    return (
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
    )
}

export default FormFields