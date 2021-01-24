import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

function BusinessTabPanel({ children, currentTab, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={currentTab !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {currentTab === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

BusinessTabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  currentTab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default BusinessTabPanel;
