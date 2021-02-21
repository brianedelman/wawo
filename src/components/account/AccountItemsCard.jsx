import PropTypes from 'prop-types';
import { Box, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from 'components/router/Link';
import CardDisplayText from 'components/CardDisplayText';

const useStyles = makeStyles(theme => ({
  businessCard: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
  image: {
    marginBottom: theme.spacing(2),
  },
}));

function AccountItemsCard({ item, itemLabel }) {
  const classes = useStyles();

  // TODO: better reusability
  return (
    <Card className={classes.businessCard}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width="85%"
      >
        <CardDisplayText value={item.title} label="Title" />
        <CardDisplayText value={item.text} label="Promotion" />
        <CardDisplayText value={item.personName} label="Person Name" />
        <CardDisplayText value={item.personTitle} label="Person Title" />
        <CardDisplayText value={item.quote} label="Testimonial" />
        <CardDisplayText value={item.name} label={`${itemLabel} Name`} />
        <CardDisplayText value={item.when} label={`${itemLabel} Dates/Hours`} />
        <CardDisplayText
          value={item.location}
          label={`${itemLabel} Location`}
        />
        <CardDisplayText
          value={item.description}
          label={`${itemLabel} Description`}
        />

        {item.image && (
          <>
            <Typography color="textSecondary">{itemLabel} Photo:</Typography>
            <img
              className={classes.image}
              src={item.image}
              alt={`${item.name} event`}
            />
          </>
        )}
        {item.link && (
          <>
            <Typography color="textSecondary">{itemLabel} Link:</Typography>
            <Link
              href={item.link}
              className={classes.button}
              variant="outlined"
            >
              {item.link}
            </Link>
          </>
        )}
      </Box>
    </Card>
  );
}

AccountItemsCard.propTypes = {
  item: PropTypes.object.isRequired,
  itemLabel: PropTypes.string.isRequired,
};

export default AccountItemsCard;
