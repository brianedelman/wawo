import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  InputAdornment,
  Box,
  Button,
  Hidden,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';

import CategoryInfo from 'components/directory/CategoryInfo';
import AutoCompleteField from 'components/forms/fields/AutoCompleteField';
import InputField from 'components/forms/fields/InputField';
import { getCategories } from 'models/forms';

const useStyles = makeStyles(theme => ({
  filterWrapper: {
    background: theme.palette.salmon,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: 0,
  },
  innerContainer: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    padding: '0 40px',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
      maxWidth: '1200px',
    },
  },
  field: {
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(1),
      minWidth: '176px',
    },
  },
  fieldWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    '& > *': {
      width: '48%',
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },
  },
  search: {
    '& .MuiInputBase-root': {
      [theme.breakpoints.down('sm')]: {
        marginBottom: 0,
      },
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '250px',
    },
  },
  text: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  submit: {
    height: '55px',
    minWidth: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '100px',
    },
  },
  textWrapper: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'unset',
      height: '100%',
    },
  },
}));

function Filters({ values, filteredCategory, ...rest }) {
  const classes = useStyles();

  return (
    <Box my={4}>
      <Paper elevation={0} className={classes.filterWrapper} square>
        <Box my={1} className={classes.innerContainer}>
          <Hidden mdUp implementation="css">
            <Typography variant="h5">Search for Businesses</Typography>
          </Hidden>
          <Box className={classes.fieldWrapper}>
            <AutoCompleteField
              fullWidth
              name="category"
              type="text"
              label="Category"
              value={values.category}
              optionLabel={option => `${option.name}`}
              callback={getCategories}
              className={classes.field}
              disabled={false}
              {...rest}
            />
            <AutoCompleteField
              fullWidth
              name="pricePoint"
              type="text"
              label="Price Point: All"
              value={values.pricePoint}
              optionLabel={option => `${option.label}`}
              className={classes.field}
              callback={() => [
                { label: '$', value: 1 },
                { label: '$$', value: 2 },
                { label: '$$$', value: 3 },
                { label: '$$$$', value: 4 },
              ]}
              disabled={false}
              {...rest}
            />
          </Box>
          <InputField
            fullWidth
            name="search"
            type="text"
            label="Search for Businesses"
            value={values.search}
            className={clsx(classes.field, classes.search)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            {...rest}
          />
          <Box className={classes.textWrapper}>
            <Typography className={classes.text}>in</Typography>
          </Box>
          <InputField
            fullWidth
            name="location"
            type="text"
            label="City or Zip"
            value={values.location}
            className={classes.field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RoomIcon />
                </InputAdornment>
              ),
            }}
            {...rest}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            className={classes.submit}
          >
            Search
          </Button>
        </Box>
        {filteredCategory && <CategoryInfo category={filteredCategory} />}
      </Paper>
    </Box>
  );
}

Filters.propTypes = {
  filteredCategory: PropTypes.object,
  values: PropTypes.object.isRequired,
};
Filters.defaultProps = {
  filteredCategory: null,
};

export default Filters;
