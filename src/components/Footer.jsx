import {
  Container,
  Grid,
  Box,
  List,
  ListItem,
  Hidden,
  Paper,
  Typography,
  IconButton,
} from '@material-ui/core';
import Feed from 'react-instagram-authless-feed';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { makeStyles } from '@material-ui/core/styles';

import ErrorBoundary from 'components/ErrorBoundary';
import Link from 'components/router/Link';
import { URLS } from 'constants.js';
import FooterLogo from 'components/svgs/FooterLogo';

const thisyear = new Date().getFullYear();

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: 'auto',
    paddingTop: theme.spacing(4),
  },
  links: {
    '& a': {
      fontSize: '1rem',
      color: theme.palette.text.primary,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.footer} elevation={0}>
      <Container maxWidth="lg" className={classes.height}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.height}
        >
          <Grid item xs={12} md={6} className={classes.height} />
          <Hidden smDown implementation="css">
            <Grid item md={2} className={classes.height} />
          </Hidden>

          <Grid item xs={12} md={4}>
            <FooterLogo />
            <List
              className={classes.links}
              component="nav"
              aria-label="Footer links"
            >
              <ListItem disableGutters>
                <Link href={URLS.contact}>Contact Us</Link>
              </ListItem>

              <ListItem disableGutters>
                <Link href={URLS.conditions}>Terms and Conditions</Link>
              </ListItem>

              <ListItem disableGutters>
                <Link href={URLS.termsUse}>Terms of Use</Link>
              </ListItem>

              <ListItem disableGutters>
                <Link href={URLS.privacy}>Privacy Policy</Link>
              </ListItem>

              <ListItem disableGutters>
                <IconButton
                  href="https://www.facebook.com/wearewomenowned/"
                  target="_blank"
                  rel="noopener nofollow"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  href="https://www.instagram.com/wearewomenowned/"
                  target="_blank"
                  rel="noopener nofollow"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  href="mailto:hello@wearewomenowned.com"
                  target="_blank"
                >
                  <MailOutlineIcon />
                </IconButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <ErrorBoundary>
          <Feed
            userName="wearewomenowned"
            className="Feed"
            classNameLoading="Loading"
            limit="3"
          />
        </ErrorBoundary>

        <Box my={2}>
          <Typography variant="body1" color="textSecondary" align="center">
            {'Copyright © '}
            {thisyear}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;
