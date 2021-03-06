import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'components/router/Link';

const useStyles = makeStyles(theme => ({
  button: {
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.white,
    },
  },
}));

const UserBusinessLinks = ({ path, user }) => {
  const classes = useStyles();
  return (
    <>
      {user.businesses.length > 1 && (
        <Box display="flex" width="100%" mb={3}>
          {user.businesses.map(biz => (
            <Box mr={2} key={biz.slug}>
              <Link
                componentType="button"
                variant="outlined"
                color="primary"
                href={`${path}${biz.slug}`}
                className={classes.button}
              >
                {biz.name}
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

UserBusinessLinks.propTypes = {
  user: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default UserBusinessLinks;
