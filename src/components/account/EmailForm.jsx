import { Form, Field, Formik } from 'formik';
import { useSnackbar } from 'notistack';

import { Typography, Button, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import { changeEmail, ChangeEmailSchema } from 'models/user';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  grid: {
    marginBottom: theme.spacing(1),
  },
  bottomSpace: {
    marginBottom: theme.spacing(2),
  },
  formHeader: {
    fontWeight: 'bold',
  },
}));

const EmailForm = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = (values, actions) => {
    changeEmail(values)
      .then(response => {
        enqueueSnackbar('Successfully changed Email!', {
          variant: 'success',
        });
        return response;
      })
      .then(response => {
        actions.setSubmitting(false);
        return response;
      })
      .catch(error => {
        actions.setSubmitting(false);
        if (error.nonFieldErrors) {
          enqueueSnackbar(error.nonFieldErrors, {
            variant: 'error',
          });
        } else {
          actions.setErrors(error);
        }
      });
  };
  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newEmail: '',
        reNewEmail: '',
      }}
      className={classes.form}
      validateOnChange
      validationSchema={ChangeEmailSchema}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <Form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Typography className={classes.formHeader}>Email</Typography>
          </Grid>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12}>
              <Field
                fullWidth
                component={TextField}
                name="currentPassword"
                autoComplete="current-password"
                label="Current Password"
                type="password"
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                fullWidth
                name="newEmail"
                component={TextField}
                autoComplete="email"
                type="email"
                label="New Email"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                fullWidth
                name="reNewEmail"
                component={TextField}
                autoComplete="email"
                type="email"
                label="Repeat New Email"
              />
            </Grid>
          </Grid>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={classes.bottomSpace}
            disabled={!isValid && dirty}
          >
            Update Email
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default EmailForm;
