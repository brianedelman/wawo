import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const AccountPageHeader = ({ children }) => {
  return (
    <Box width="78px" mb={4} mt={3} display="flex" justifyContent="center">
      {children}
    </Box>
  );
};

AccountPageHeader.propTypes = {
  children: PropTypes.object,
};

AccountPageHeader.defaultProps = {
  children: [],
};

export default AccountPageHeader;
