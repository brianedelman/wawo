import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  colorOverride: {
    color: props => props.colorOverride,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
  background: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: props => props.backgroundColor,
  },
}));

const Title = ({ stream }) => {
  const classes = useStyles(stream);
  const {
    title,
    variant,
    component,
    colorOverride,
    backgroundColor,
    alignment,
    containment,
  } = stream;

  return (
    <Box
      className={clsx(classes.wrapper, backgroundColor && classes.background)}
    >
      <Container maxWidth={containment}>
        <Typography
          align={alignment}
          component={component || variant}
          variant={variant}
          className={clsx(colorOverride && classes.colorOverride)}
        >
          {title}
        </Typography>
      </Container>
    </Box>
  );
};

Title.propTypes = {
  stream: PropTypes.shape({
    title: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    component: PropTypes.string,
    colorOverride: PropTypes.string,
    backgroundColor: PropTypes.string,
    alignment: PropTypes.oneOf('left', 'center', 'right').isRequired,
    containment: PropTypes.string.isRequired,
  }).isRequired,
};

export default Title;
