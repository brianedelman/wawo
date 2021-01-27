import { PROPTYPES } from 'constants.js';
import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  image: {
    width: '100%',
  },
  smallName: {
    fontSize: theme.typography.pxToRem(24),
  },
}));

function FounderAbout({ content }) {
  const classes = useStyles();

  const about = content.about.split('\n');
  const founderName = `${content.displayFirstName} ${content.displayLastName}`;
  return (
    <Box className={classes.container}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            className={classes.image}
            src={content.profileImage}
            alt={founderName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mb={4}>
            <Typography className={classes.smallName} variant="body1">
              {founderName}
            </Typography>
            <Typography paragraph variant="body2" color="textSecondary">
              {content.founderTitle}
            </Typography>
          </Box>

          <Typography variant="h3">About {founderName}</Typography>
          {about.map((desc, idx) => (
            <Typography paragraph variant="body1" key={idx}>
              {desc}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

FounderAbout.propTypes = {
  content: PROPTYPES.founder.isRequired,
};

export default FounderAbout;
