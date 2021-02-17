import { PROPTYPES } from 'constants.js';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';

import { Typography, Button, Grid } from '@material-ui/core';
import AutoCompleteField from 'components/forms/fields/AutoCompleteField';
import { makeStyles } from '@material-ui/core/styles';
import { getCategories } from 'models/forms';

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

const CategoriesForm = ({ business, handleBusinessFormSubmit }) => {
  const classes = useStyles();

  const handleFormSubmit = async (values, actions) => {
    // TODO this will handle any processing needed for sub form
    handleBusinessFormSubmit(values, actions);
  };

  return (
    <Formik
      initialValues={{
        categories: business.categories,
      }}
      validateOnChange
      validationSchema={BusinessPricePointSchema}
      enableReinitialize
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <Form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Typography paragraph className={classes.formHeader}>
              Categories: {business.name}
            </Typography>
          </Grid>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12}>
              <AutoCompleteField
                multiple
                fullWidth
                name="categories"
                type="text"
                label="Category"
                helperText="Choose all that apply"
                optionLabel={option => `${option.name}`}
                callback={getCategories}
                className={classes.field}
                disabled={false}
              />
            </Grid>
          </Grid>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            size="large"
            className={classes.bottomSpace}
            disabled={!isValid && dirty}
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

CategoriesForm.propTypes = {
  business: PROPTYPES.business.isRequired,
  handleBusinessFormSubmit: PropTypes.func.isRequired,
};

export default CategoriesForm;
