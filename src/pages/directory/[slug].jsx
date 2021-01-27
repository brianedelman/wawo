import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'util/axios';
import { URLS } from 'constants.js';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Grid, Container, Typography } from '@material-ui/core';

import BusinessAbout from 'components/directory/detail/BusinessAbout';
import FounderAbout from 'components/directory/detail/FounderAbout';
import BusinessInfo from 'components/directory/detail/BusinessInfo';
import BusinessTabs from 'components/directory/detail/BusinessTabs';
import BusinessTabPanel from 'components/directory/detail/BusinessTabPanel';
import BusinessEvent from 'components/directory/detail/BusinessEvent';
import BusinessPromotion from 'components/directory/detail/BusinessPromotion';
import BusinessTestimonial from 'components/directory/detail/BusinessTestimonial';

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

  if (!business) return null;
  const { founder, events, promotions, testimonials } = business;
  const secondaryTabs = [
    ...(founder.displayFounderInformation && [
      {
        label: 'About the Founder',
        content: [founder],
        component: FounderAbout,
      },
    ]),
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
      <Container maxWidth="md" disableGutters>
        <Box
          mb={5}
          style={{ backgroundImage: `url(${business.heroImage})` }}
          className={classes.hero}
        />
      </Container>
      <Container maxWidth="md">
        <BusinessInfo business={business} />
        <BusinessTabs
          business={business}
          currentTab={tab}
          setTab={setTab}
          tabs={secondaryTabs}
        />
        <BusinessTabPanel currentTab={tab} index={0}>
          <BusinessAbout business={business} />
        </BusinessTabPanel>
        {secondaryTabs.map((tabItem, itemIdx) => (
          <BusinessTabPanel currentTab={tab} index={itemIdx + 1}>
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
  const results = [];
  // TODO: I think this is a blessed approach to just give static paths nothing, but might be worth
  // looking into someday
  //   const { data } = await axios.get(URLS.api.directorySlugs);

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
