import {
  Container,
  Grid,
  Button,
  Box,
  List,
  ListItem,
  Hidden,
  Paper,
  Typography,
  IconButton,
} from '@material-ui/core';
import clsx from 'clsx';
// import Feed from 'react-instagram-authless-feed';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { makeStyles } from '@material-ui/core/styles';

// import ErrorBoundary from 'components/ErrorBoundary';
import Link from 'components/router/Link';
import { URLS } from 'constants.js';
import FooterLogo from 'components/svgs/FooterLogo';

const thisyear = new Date().getFullYear();

const useStyles = makeStyles(theme => ({
  feed: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: '100%',
    '& a': {
      flex: 1,
      '& img': {
        width: '100%',
      },
    },
  },
  footer: {
    backgroundColor: theme.palette.pink,
    marginTop: 'auto',
    paddingTop: theme.spacing(4),
  },
  footerGrid: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
  links: {
    '& .MuiListItem-root': {
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
    },
    '& a': {
      fontSize: '1rem',
      color: theme.palette.text.primary,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.footer} elevation={0} square>
      <Container maxWidth="md" className={classes.height}>
        <Grid
          container
          alignItems="center"
          justify="space-between"
          className={classes.height}
        >
          <Grid
            item
            xs={12}
            md={6}
            className={clsx(classes.height, classes.footerGrid)}
          >
            <Typography color="primary" variant="h3">
              Stay in the WAWO Know
            </Typography>
            <Button
              variant="contained"
              href="http://eepurl.com/dinzNX"
              target="_blank"
              rel="nofollow noopener"
              color="primary"
              size="large"
            >
              Sign Up for our Newsletter
            </Button>
          </Grid>
          <Hidden smDown implementation="css">
            <Grid item md={2} className={classes.height} />
          </Hidden>

          <Grid
            item
            xs={12}
            md={4}
            className={clsx(classes.height, classes.footerGrid)}
          >
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
      </Container>
      {/* <ErrorBoundary> */}
      {/* <Feed */}
      {/*   userName="wearewomenowned" */}
      {/*   className={classes.feed} */}
      {/*   classNameLoading="Loading" */}
      {/*   limit={8} */}
      {/* /> */}
      {/* </ErrorBoundary> */}

      <Box mt={1} mb={2}>
        <Typography variant="body1" color="textSecondary" align="center">
          {'Copyright © '}
          {thisyear}
          {'.'}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Footer;
