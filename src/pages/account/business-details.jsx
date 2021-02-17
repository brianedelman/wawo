import { withAuthRequired } from 'util/withAuth';
import { Form, Field, Formik } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';
import { useSnackbar } from 'notistack';

import {
  Grid,
  Button,
  Box,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AccountWrapper from 'components/account/AccountWrapper';
import {
  patchUser,
  FounderSchema,
  useCurrentUser,
  useMutateCurrentUser,
} from 'models/user';

const useStyles = makeStyles(theme => ({
  grid: {
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formHeader: {
    fontWeight: 'bold',
  },
}));

const BusinessDetails = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const me = useCurrentUser();
  const mutate = useMutateCurrentUser();

  // TODO fix other forms as they could work better like this
  const handleFormSubmit = async (values, actions) => {
    try {
      await patchUser(values);
      // mutate and don't revalidate
      await mutate({ ...me, ...values }, false);
      await enqueueSnackbar('Successfully updated profile!', {
        variant: 'success',
      });
      actions.setSubmitting(false);
    } catch (error) {
      actions.setSubmitting(false);
      if (error.nonFieldErrors) {
        enqueueSnackbar(error.nonFieldErrors, {
          variant: 'error',
        });
      } else {
        actions.setErrors(error);
      }
    }
  };

  return (
    <AccountWrapper title="My Profile">
      <Box mb={3}>
        <Formik
          initialValues={{
            founderFirstName: me.founderFirstName,
            founderLastName: me.founderLastName,
            about: me.about,
            founderTitle: me.founderTitle,
            displayFounderInformation: me.displayFounderInformation,
          }}
          className={classes.form}
          validateOnChange
          validationSchema={FounderSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, isValid, dirty }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2} className={classes.grid}>
                <Grid item xs={12}>
                  <Typography className={classes.formHeader}>
                    Founder Info
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name="founderFirstName"
                    fullWidth
                    label="Founder First Name"
                    placeholder="Enter First Name"
                    helperText="If different from name in profile"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    name="founderLastName"
                    fullWidth
                    component={TextField}
                    label="Founder Last Name"
                    placeholder="Enter Last Name"
                    helperText="If different from name in profile"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="founderTitle"
                    fullWidth
                    component={TextField}
                    label="Title (ex. 'Founder')"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="about"
                    fullWidth
                    component={TextField}
                    label="About the Founder"
                    multiline
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label="Yes, display founder name and profile image to all users."
                  control={
                    <Field
                      name="displayFounderInformation"
                      type="checkbox"
                      color="primary"
                      component={Checkbox}
                    />
                  }
                />
              </Grid>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className={classes.button}
                disabled={!isValid && dirty}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </AccountWrapper>
  );
};

// BusinessDetails.getInitialProps = async ctx => {};

export default withAuthRequired(BusinessDetails);
