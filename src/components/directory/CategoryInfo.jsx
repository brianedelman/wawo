import { PROPTYPES } from 'constants.js';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.salmon,
  },
  text: {
    width: '100%',
    padding: '40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      width: '55%',
      height: '460px',
    },
  },
  image: {
    width: '45%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    marginBottom: theme.spacing(5),
  },
  description: {
    maxWidth: '335px',
  },
}));

const CategoryInfo = ({ category }) => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.text}>
        <Typography variant="h2" className={classes.title}>
          {category.name}
        </Typography>
        <Typography variant="body2" className={classes.description}>
          {category.description}
        </Typography>
      </Box>
      <Box
        style={{ backgroundImage: `url(${category.image})` }}
        className={classes.image}
      />
    </Box>
  );
};

CategoryInfo.propTypes = {
  category: PROPTYPES.category.isRequired,
};

export default CategoryInfo;
