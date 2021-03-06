import { PROPTYPES } from 'constants.js';
import PropTypes from 'prop-types';
import { Form, Field, Formik } from 'formik';

import { Typography, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import { BusinessSocialSchema } from 'models/business';

const useStyles = makeStyles(theme => ({
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

const SocialMediaAccountsForm = ({ business, handleBusinessFormSubmit }) => {
  const classes = useStyles();

  const handleFormSubmit = async (values, actions) => {
    // TODO this will handle any processing needed for sub form
    handleBusinessFormSubmit(values, actions);
  };

  return (
    <Formik
      initialValues={{
        facebook: business.facebook,
        twitter: business.twitter,
        instagram: business.instagram,
        youtube: business.youtube,
      }}
      validateOnChange
      validationSchema={BusinessSocialSchema}
      enableReinitialize
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Typography className={classes.formHeader}>
              Social Media Accounts: {business.name}
            </Typography>
          </Grid>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12}>
              <Field
                fullWidth
                component={TextField}
                name="facebook"
                label="Facebook"
                type="url"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                fullWidth
                component={TextField}
                name="twitter"
                label="Twitter"
                type="url"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                fullWidth
                component={TextField}
                name="instagram"
                label="Instagram"
                type="url"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                fullWidth
                component={TextField}
                name="youtube"
                label="Youtube"
                type="url"
              />
            </Grid>
          </Grid>
          {/* <Button */}
          {/*   color="primary" */}
          {/*   variant="contained" */}
          {/*   type="submit" */}
          {/*   size="large" */}
          {/*   className={classes.bottomSpace} */}
          {/*   disabled={!isValid && dirty} */}
          {/* > */}
          {/*   Save */}
          {/* </Button> */}
        </Form>
      )}
    </Formik>
  );
};

SocialMediaAccountsForm.propTypes = {
  business: PROPTYPES.business.isRequired,
  handleBusinessFormSubmit: PropTypes.func.isRequired,
};

export default SocialMediaAccountsForm;
