import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

function CardDisplayText({ value, label }) {
  if (!value) return <></>;
  return (
    <>
      <Typography color="textSecondary">{label}:</Typography>
      <Typography paragraph>{value}</Typography>
    </>
  );
}

CardDisplayText.propTypes = {
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
};

export default CardDisplayText;
