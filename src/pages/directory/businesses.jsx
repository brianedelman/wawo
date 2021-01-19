import { useEffect, useState, useRef } from 'react';
import { URLS } from 'constants.js';
import PropTypes from 'prop-types';
import axios from 'util/axios';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Hidden, Typography } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Formik, Form } from 'formik';

import Link from 'components/router/Link';
import BusinessGrid from 'components/directory/BusinessGrid';
import Filters from 'components/directory/Filters';
import Loading from 'components/Loading';
import { DirectorySchema } from 'schemas';

const useStyles = makeStyles(theme => ({
  titleText: {
    textAlign: 'center',
    maxWidth: '700px',
  },
  featuredButton: {
    height: '60px',
    minWidth: '130px',
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 400,
  },
}));

function Businesses({ businesses, totalPages }) {
  const classes = useStyles();
  // TODO get args from query and then provide that as initial value to filters
  const router = useRouter();
  const $formik = useRef();

  const [filteringInProgress, setFilteringInProgress] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const [filteredTotalPages, setFilteredTotalPages] = useState(totalPages);

  const handleFormSubmit = async values => {
    setFilteringInProgress(true);
    console.log(values);

    const params = {
      ...(values.category ? { category: values.category.name } : null),
      ...(values.pricePoint ? { pricePoint: values.pricePoint.value } : null),
      ...(values.search ? { search: values.search } : null),
      ...(values.location ? { location: values.location } : null),
    };
    const res = await axios.get(`${URLS.api.directory}`, { params });

    router.push(
      {
        query: params,
      },
      undefined,
      { shallow: true }
    );

    setFilteredBusinesses(res.data?.results);
    setFilteredTotalPages(res.data?.totalPages);
    setFilteringInProgress(false);
    // TODO: i think there might be an easier way. AutoComplete field has access to this data but is stripping it when we set the value. could make this less fragile here
    // NOTE: this is a little weird but I want to set the category extra data
    setFilteredCategory(
      res.data?.results[0].categories.find(
        category => category.name === values.category.name
      )
    );
  };

  const handleClearFilters = () => {
    if ($formik.current) {
      $formik.current.resetForm({
        values: { search: '', location: '', category: null, pricePoint: null },
      });
    }
    setFilteredBusinesses(businesses);
    setFilteredTotalPages(totalPages);
    setFilteredCategory(null);
  };

  useEffect(() => {
    (async () => {
      if (router.query?.category) {
        const res = await axios.get(`${URLS.api.categories}`);
        const cat = res.data.results.find(
          category => category.name === router.query.category
        );
        setFilteredCategory(cat);
      }
    })();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          alignItems="center"
          mt={4}
        >
          <Typography variant="h1">Women Owned Business Directory</Typography>
          <Box className={classes.titleText}>
            <Typography variant="body1" paragraph>
              The We Are Women Owned Business Directory is a curated list of
              businesses and non-profits owned by women or female-identifying
              entrepreneurs that offer products and services. WAWO is committed
              to providing visibility and increased opportunities for
              women-owned businesses.
            </Typography>
          </Box>
        </Box>

        <Hidden smDown implementation="css">
          <Box display="flex" justifyContent="space-around" mb={8} mt={4}>
            <Link
              href="/?TODO"
              componentType="button"
              variant="contained"
              color="primary"
              size="large"
              className={classes.featuredButton}
            >
              Products
            </Link>
            <Link
              href="/?TODO"
              componentType="button"
              variant="contained"
              color="primary"
              size="large"
              className={classes.featuredButton}
            >
              Services
            </Link>
            <Link
              href="/?TODO"
              componentType="button"
              variant="contained"
              color="primary"
              size="large"
              className={classes.featuredButton}
            >
              Non-Profits
            </Link>
            <Link
              href="/?TODO"
              componentType="button"
              variant="contained"
              color="primary"
              size="large"
              className={classes.featuredButton}
            >
              See All
            </Link>
          </Box>
        </Hidden>
      </Container>
      <Formik
        innerRef={$formik}
        validationSchema={DirectorySchema}
        enableReinitialize
        initialValues={{
          category: filteredCategory ? { name: filteredCategory.name } : null,
          pricePoint: router.query?.pricePoint
            ? {
                value: router.query?.pricePoint,
                label: new Array(Number(router.query?.pricePoint) + 1).join(
                  '$'
                ),
              }
            : null,
          search: router.query?.search || '',
          location: router.query?.location || '',
        }}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Filters
              values={values}
              errors={errors}
              filteredCategory={filteredCategory}
            />
          </Form>
        )}
      </Formik>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center">
          {filteringInProgress ? (
            <Loading />
          ) : (
            <BusinessGrid
              businesses={filteredBusinesses}
              clearFilters={handleClearFilters}
            />
          )}
        </Box>

        <Box display="flex" justifyContent="center" my={8}>
          {filteredTotalPages > 0 && (
            <Pagination
              count={filteredTotalPages}
              variant="outlined"
              color="secondary"
              shape="rounded"
              renderItem={item => (
                <PaginationItem
                  component={Link}
                  href={`/directory/businesses${
                    item.page === 1 ? '' : `?page=${item.page}`
                  }`}
                  {...item}
                />
              )}
            />
          )}
        </Box>
      </Container>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  const currentPage = query.page || 1;

  const params = {
    page: currentPage,
    ...query,
  };
  const {
    data: { totalPages, results },
  } = await axios.get(`${URLS.api.directory}`, { params });

  return {
    props: {
      totalPages,
      businesses: results,
    },
  };
};

Businesses.propTypes = {
  businesses: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Businesses;
