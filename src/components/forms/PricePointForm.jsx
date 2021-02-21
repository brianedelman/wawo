import { PROPTYPES } from 'constants.js';
import PropTypes from 'prop-types';
import { Form, Field, Formik } from 'formik';

import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { Select } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import { BusinessPricePointSchema } from 'models/business';

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
  field: {
    minWidth: '200px',
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
        pricePoint: business.pricePoint,
      }}
      validateOnChange
      validationSchema={BusinessPricePointSchema}
      enableReinitialize
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Typography paragraph className={classes.formHeader}>
              Price Point: {business.name}
            </Typography>
            <Typography paragraph>
              Price point is an estimation of the general cost of items on your
              website.
            </Typography>
            <Typography>$ = 0 - $25</Typography>
            <Typography>$$ = $26 - $50</Typography>
            <Typography>$$$ = $51 - $100</Typography>
            <Typography paragraph>$$$$ = $100+</Typography>
          </Grid>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="price-point">Price Point</InputLabel>
                <Field
                  component={Select}
                  labelId="label-for-price-point"
                  InputProps={{
                    id: 'price-point',
                  }}
                  className={classes.field}
                  name="pricePoint"
                  variant="filled"
                  /* onChange={handleChange('pricePoint')} */
                >
                  <MenuItem value={null}>N/A</MenuItem>
                  <MenuItem value={1}>$</MenuItem>
                  <MenuItem value={2}>$$</MenuItem>
                  <MenuItem value={3}>$$$</MenuItem>
                  <MenuItem value={4}>$$$$</MenuItem>
                </Field>
              </FormControl>
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
