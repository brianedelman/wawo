import { PROPTYPES } from 'constants.js';
import PropTypes from 'prop-types';
import { Form, Field, Formik } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';

import { Grid, Box, FormControlLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BusinessInfoSchema } from 'models/business';

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

const BusinessInfoForm = ({ business, handleBusinessFormSubmit }) => {
  const classes = useStyles();

  const handleFormSubmit = async (values, actions) => {
    // TODO this will handle any processing needed for sub form
    handleBusinessFormSubmit(values, actions);
  };

  return (
    <Formik
      initialValues={{
        name: business.name,
        description: business.description,
        shortDescription: business.shortDescription,
        businessUrl: business.businessUrl,
        businessType: [business.businessType],
        locationType: [business.locationType],
        address1: business.address1,
        address2: business.address2,
        city: business.city,
        state: business.state,
        country: business.country,
        postalCode: business.postalCode,
        storeHours: business.storeHours,
      }}
      className={classes.form}
      enableReinitialize
      validateOnChange
      validationSchema={BusinessInfoSchema}
      onSubmit={handleFormSubmit}
    >
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12}>
              <Typography className={classes.formHeader}>
                Business Info
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="name"
                fullWidth
                label="Business Name"
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                name="description"
                fullWidth
                component={TextField}
                label="Business Description (long)"
                helperText="Longer description displayed on business page"
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="shortDescription"
                fullWidth
                component={TextField}
                label="Business Description (short)"
                helperText="Shorter description displayed in directory"
                inputProps={{ maxLength: 255 }}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="businessUrl"
                fullWidth
                component={TextField}
                type="url"
                label="Website"
              />
            </Grid>
            <Grid item xs={12}>
              <Box mt={2}>
                <Typography className={classes.formHeader}>
                  Business Type
                </Typography>
              </Box>
              <Grid item xs={12}>
                <Box mt={2}>
                  <FormControlLabel
                    label="Product"
                    control={
                      <Field
                        name="businessType"
                        type="checkbox"
                        color="primary"
                        value="PDCT"
                        component={Checkbox}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Service"
                    control={
                      <Field
                        name="businessType"
                        type="checkbox"
                        color="primary"
                        value="SRVC"
                        component={Checkbox}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Non-Profit"
                    control={
                      <Field
                        name="businessType"
                        type="checkbox"
                        color="primary"
                        value="NPFT"
                        component={Checkbox}
                      />
                    }
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.formHeader}>
                Business Location
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label="Online"
                control={
                  <Field
                    name="locationType"
                    type="checkbox"
                    color="primary"
                    value="ONLN"
                    component={Checkbox}
                  />
                }
              />
              <FormControlLabel
                label="Brick & Mortar"
                control={
                  <Field
                    name="locationType"
                    type="checkbox"
                    color="primary"
                    value="PHYS"
                    component={Checkbox}
                  />
                }
              />
            </Grid>

            {values.locationType.includes('PHYS') && (
              <>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="address1"
                    fullWidth
                    label="Address 1"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="address2"
                    fullWidth
                    label="Address 2"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    name="city"
                    fullWidth
                    label="City"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    name="state"
                    fullWidth
                    label="State"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    name="postalCode"
                    fullWidth
                    label="Zip Code"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    name="country"
                    fullWidth
                    label="Country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="storeHours"
                    fullWidth
                    label="Store Hours"
                    multiline
                  />
                </Grid>
              </>
            )}
          </Grid>
          {/* <Button */}
          {/*   color="primary" */}
          {/*   variant="contained" */}
          {/*   type="submit" */}
          {/*   size="large" */}
          {/*   className={classes.button} */}
          {/*   disabled={!isValid && dirty} */}
          {/* > */}
          {/*   Save */}
          {/* </Button> */}
        </Form>
      )}
    </Formik>
  );
};

BusinessInfoForm.propTypes = {
  handleBusinessFormSubmit: PropTypes.func.isRequired,
  business: PROPTYPES.business.isRequired,
};

export default BusinessInfoForm;
