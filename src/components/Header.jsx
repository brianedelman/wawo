import clsx from 'clsx';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Hidden,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Logo from 'components/svgs/Logo';

import MenuIcon from '@material-ui/icons/Menu';
import DropDownMenu from 'components/menus/DropDownMenu';
import AccountMenu from 'components/menus/Account';
import Link from 'components/router/Link';
import { URLS } from 'constants.js';

const useStyles = makeStyles(theme => ({
  appBar: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: '1rem',
    textTransform: 'uppercase',
    color: theme.palette.black,
  },
  mobileMenu: {
    '& ul': {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: theme.spacing(3),
      padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(
        3
      )}px ${theme.spacing(3)}px`,
      alignItems: 'flex-end',
      '& .MuiButton-root, & .MuiLink-root': {
        marginTop: theme.spacing(2),
      },
    },
  },
  small: {
    height: '80px',
  },
  logo: {
    display: 'block',
    height: '100%',
  },
  height: {
    height: '100%',
  },
}));

export default function Header() {
  const classes = useStyles();
  const trigger = useScrollTrigger({ threshold: 15 });

  const navMenuState = usePopupState({
    variant: 'popover',
    popupId: 'navMenu',
  });

  const menu = [
    <DropDownMenu
      menuName="Directory"
      items={[
        { text: 'All', link: '/' },
        { text: 'Products', link: '/' },
        { text: 'Services', link: '/' },
        { text: 'Non-Profits', link: '/' },
      ]}
      className={classes.menuButton}
    />,
    <DropDownMenu
      menuName="Sisterhood"
      items={[
        { text: 'Become a Member', link: URLS.sisterhood.become },
        { text: 'Members', link: URLS.sisterhood.members },
        { text: 'Host a Workshop', link: URLS.sisterhood.host },
        { text: 'Member Login', link: URLS.sisterhood.login },
      ]}
      linkClassName={classes.menuButton}
    />,
    <DropDownMenu
      menuName="Blog"
      items={[
        { text: 'Founder Features', link: URLS.blog.founderFeatures },
        { text: 'Retail', link: URLS.blog.retail },
        { text: 'Marketing', link: URLS.blog.marketing },
        { text: 'Self-Care + Wellness', link: URLS.blog.wellness },
        { text: 'COVID-19 Resources', link: URLS.covid },
      ]}
      linkClassName={classes.menuButton}
    />,
    <DropDownMenu
      menuName="Events"
      items={[
        { text: 'Events Calendar', link: URLS.events.month },
        { text: 'Past WAWO Events', link: URLS.events.gallery },
      ]}
      linkClassName={classes.menuButton}
    />,
    <DropDownMenu
      menuName="About"
      items={[
        { text: 'About Us', link: URLS.about },
        { text: 'Contact', link: URLS.contact },
      ]}
      linkClassName={classes.menuButton}
    />,
    <Link
      className={classes.menuButton}
      href="https://www.wearewomenowned.com/press/"
    >
      Press
    </Link>,
    <AccountMenu linkClassName={classes.menuButton} />,
  ];

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        className={clsx(classes.appBar, trigger ? classes.small : '')}
      >
        <Toolbar disableGutters>
          <Container maxWidth="lg" className={classes.height}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.height}
            >
              <Grid item xs={6} md={2} className={classes.height}>
                <Link href="/" className={classes.logo}>
                  <Logo className={classes.logo} />
                </Link>
              </Grid>
              <Grid item xs={6} md={10} align="right">
                <Hidden mdUp implementation="css">
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    data-cy="auth-menu-button"
                    {...bindTrigger(navMenuState)}
                  >
                    <MenuIcon color="primary" />
                  </IconButton>
                  <Menu
                    id="mobile-menu"
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    keepMounted
                    {...bindMenu(navMenuState)}
                    className={classes.mobileMenu}
                  >
                    {menu.map((item, index) => (
                      <MenuItem key={index}>{item}</MenuItem>
                    ))}
                  </Menu>
                </Hidden>
                <Hidden smDown implementation="css">
                  <Box display="flex" justifyContent="flex-end">
                    {menu.map((item, index) => (
                      <MenuItem key={index}>{item}</MenuItem>
                    ))}
                  </Box>
                </Hidden>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      {/* TODO: get the actual height of appbar */}
      <Box height={122} />
    </>
  );
}
