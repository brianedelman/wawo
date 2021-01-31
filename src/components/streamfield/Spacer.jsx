import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  box: {
    height: props => props.mobileHeight,
    [theme.breakpoints.up('md')]: {
      height: props => props.height,
    },
  },
}));

const Spacer = ({ stream }) => {
  const classes = useStyles(stream);
  return <Box className={classes.box} />;
};

Spacer.propTypes = {
  stream: PropTypes.shape({
    height: PropTypes.number.isRequired,
    mobileHeight: PropTypes.number,
  }).isRequired,
};
export default Spacer;
