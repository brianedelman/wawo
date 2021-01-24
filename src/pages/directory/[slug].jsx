import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'util/axios';
import { URLS } from 'constants.js';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Grid, Container, Typography } from '@material-ui/core';

import BusinessAbout from 'components/directory/detail/BusinessAbout';
import BusinessInfo from 'components/directory/detail/BusinessInfo';
import BusinessTabs from 'components/directory/detail/BusinessTabs';
import BusinessTabPanel from 'components/directory/detail/BusinessTabPanel';
import BusinessEvent from 'components/directory/detail/BusinessEvent';
import BusinessPromotion from 'components/directory/detail/BusinessPromotion';
import BusinessTestimonial from 'components/directory/detail/BusinessTestimonial';
import BusinessImages from 'components/directory/detail/BusinessImages';

const useStyles = makeStyles(() => ({
  hero: {
    width: '100%',
    height: '400px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

const DirectoryDetailPage = ({ business }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const { events, promotions, testimonials } = business;
  const secondaryTabs = [
    ...(events.length && [
      {
        label: 'Events',
        content: events,
        component: BusinessEvent,
      },
    ]),
    ...(promotions.length && [
      {
        label: 'Current Promotions',
        content: promotions,
        component: BusinessPromotion,
      },
    ]),
    ...(testimonials.length && [
      {
        label: 'Testimonials',
        content: testimonials,
        component: BusinessTestimonial,
      },
    ]),
  ];
  return (
    <>
      <Container maxWidth="lg" disableGutters>
        <Box
          mb={5}
          style={{ backgroundImage: `url(${business.heroImage})` }}
          className={classes.hero}
        />
      </Container>
      <Container maxWidth="lg">
        <BusinessInfo business={business} />
        <BusinessTabs
          business={business}
          currentTab={tab}
          setTab={setTab}
          tabs={secondaryTabs}
        />
        <BusinessTabPanel currentTab={tab} index={0}>
          <Typography variant="h3">About {business.name}</Typography>
          <BusinessAbout business={business} />
        </BusinessTabPanel>
        <BusinessTabPanel currentTab={tab} index={1}>
          <Typography variant="h3">Photos</Typography>
          <BusinessImages business={business} />
        </BusinessTabPanel>
        {secondaryTabs.map((tabItem, itemIdx) => (
          <BusinessTabPanel currentTab={tab} index={itemIdx + 2}>
            <Typography variant="h3">{tabItem.label}</Typography>
            <Grid container spacing={2}>
              {tabItem.content.map(item => {
                const TagName = tabItem.component;
                return (
                  <TagName key={item.id} content={item} business={business} />
                );
              })}
            </Grid>
          </BusinessTabPanel>
        ))}
      </Container>
    </>
  );
};

DirectoryDetailPage.propTypes = {
  business: PropTypes.object,
};

DirectoryDetailPage.defaultProps = {
  business: null,
};

export async function getStaticProps({ params }) {
  const { data } = await axios.get(`${URLS.api.directory}${params.slug}/`);
  return {
    props: {
      business: data,
    },
    revalidate: 1,
  };
}
export async function getStaticPaths() {
  // TODO:? we need to update the build to pull from a current api before this can pass circle
  let results = [];
  try {
    const { data } = await axios.get(URLS.api.directorySlugs);
    results = data.results;
  } catch (error) {
    console.log(error);
  }

  const paths = results.map(item => {
    return {
      params: { ...item },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
export default DirectoryDetailPage;
