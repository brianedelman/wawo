import PropTypes from 'prop-types';
import { PROPTYPES } from 'constants.js';
import { Box, Tabs, Tab } from '@material-ui/core';

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

function BusinessTabs({ currentTab, setTab, tabs }) {
  return (
    <Box>
      <Tabs
        value={currentTab}
        onChange={(event, newValue) => setTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="on"
        aria-label="business info tabs"
      >
        <Tab label="About" {...a11yProps(0)} />
        {tabs.map((item, idx) => (
          <Tab key={idx} label={item.label} {...a11yProps(idx + 1)} />
        ))}
      </Tabs>
    </Box>
  );
}

BusinessTabs.propTypes = {
  business: PROPTYPES.business.isRequired,
  currentTab: PropTypes.number.isRequired,
  setTab: PropTypes.func.isRequired,
  tabs: PropTypes.array,
};

BusinessTabs.defaultProps = {
  tabs: [],
};

export default BusinessTabs;
