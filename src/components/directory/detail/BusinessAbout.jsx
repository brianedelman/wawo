import { PROPTYPES } from 'constants.js';
import { Avatar, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  avatar: {
    width: '230px',
    height: '230px',
  },
}));

function BusinessAbout({ business }) {
  const classes = useStyles();

  const description = business.description.split('\n');

  const { founder } = business;

  const about = founder.about.split('\n');
  const founderName = `${founder.displayFirstName} ${founder.displayLastName}`;
  return (
    <Box className={classes.container}>
      <Box>
        {description.map((desc, idx) => (
          <Typography paragraph variant="body1" key={idx}>
            {desc}
          </Typography>
        ))}
      </Box>
      {founder.displayFounderInformation && (
        <Box mt={5} display="flex" flexDirection="column">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={5}
          >
            <Box mr={20}>
              <Typography paragraph variant="h3">
                Meet the Founder
              </Typography>
              <Typography paragraph variant="body2">
                {founderName}
              </Typography>
            </Box>
            <Avatar
              className={classes.avatar}
              alt={founderName}
              src={founder.profileImage}
            />
          </Box>
          <Box maxWidth="800px" alignSelf="center">
            {about.map((desc, idx) => (
              <Typography paragraph variant="body1" key={idx}>
                {desc}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

BusinessAbout.propTypes = {
  business: PROPTYPES.business.isRequired,
};

export default BusinessAbout;
