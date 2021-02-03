import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'components/router/Link';

const useStyles = makeStyles(theme => ({
  colorOverride: {
    color: props => props.color,
  },
  xlButton: {
    minHeight: '62px',
    minWidth: '180px',
    fontSize: theme.typography.pxToRem(20),
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
}));

const LinkButton = ({ stream }) => {
  const classes = useStyles(stream);
  const {
    linkText,
    page,
    url,
    componentType,
    buttonBackground,
    buttonVariant,
    buttonSize,
    color,
  } = stream;
  return (
    <Box className={classes.wrapper}>
      <Link
        href={page || url}
        componentType={componentType}
        className={clsx(
          color && classes.colorOverride,
          buttonSize === 'xl' && classes.xlButton
        )}
        variant={buttonVariant}
        color={buttonBackground}
        size={buttonSize}
      >
        {linkText}
      </Link>
    </Box>
  );
};

LinkButton.propTypes = {
  stream: PropTypes.shape({
    linkText: PropTypes.string,
    page: PropTypes.string,
    url: PropTypes.string,
    componentType: PropTypes.string.isRequired,
    buttonBackground: PropTypes.string.isRequired,
    buttonVariant: PropTypes.string.isRequired,
    buttonSize: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
};

export default LinkButton;
