import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@material-ui/core';
import Link from 'components/router/Link';

const EmptyContent = ({ search, buttonText, handleClick }) => {
  return (
    <>
      {search ? (
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h2">No results matched your search.</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            size="large"
          >
            {buttonText}
          </Button>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column">
          <Typography variant="h2">Nothing to see here.</Typography>
          <Link href="/">{buttonText}</Link>
        </Box>
      )}
    </>
  );
};

EmptyContent.propTypes = {
  search: PropTypes.bool,
  buttonText: PropTypes.string,
  handleClick: PropTypes.func,
};

EmptyContent.defaultProps = {
  search: false,
  buttonText: 'Go Back Home',
  handleClick: () => null,
};

export default EmptyContent;
