import { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  IconButton,
  Drawer,
  Hidden,
  List,
  ListItemText,
  Collapse,
  Toolbar,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import SecurityIcon from '@material-ui/icons/Security';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { useCurrentUser } from 'models/user';
import SidebarListItem from 'components/account/SidebarListItem';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  noPaddingTop: {
    paddingTop: 0,
  },
  collapsable: {
    paddingLeft: '1rem',
  },
  text: {
    fontSize: theme.typography.pxToRem(14),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    marginTop: theme.spacing(8),
    textAlign: 'right',
  },
}));

const AccountSidebar = () => {
  const classes = useStyles();
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [innerMenuOpen, setInnerMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(prevOpen => !prevOpen);
    if (open) {
      setInnerMenuOpen(false);
    } else {
      setInnerMenuOpen(true);
    }
  };

  const handleClick = () => {
    setInnerMenuOpen(prevInnerMenuOpen => !prevInnerMenuOpen);
    if (!open) {
      setOpen(true);
    }
  };

  const firstBizSlug = user.businesses[0].slug;

  const renderList = () => (
    <List
      component="nav"
      aria-label="main navigation"
      className={classes.noPaddingTop}
    >
      <SidebarListItem link="/account" icon={<EditIcon />}>
        <ListItemText
          primaryTypographyProps={{
            className: classes.text,
          }}
          primary="Edit Profile"
        />
      </SidebarListItem>
      {user.isBusinessUser && (
        <>
          <SidebarListItem
            handleClick={handleClick}
            listItemClassName={classes.collapsable}
            icon={<BusinessCenterIcon />}
          >
            <ListItemText
              primaryTypographyProps={{
                className: classes.text,
              }}
              primary="Business Details"
            />
            <Box className={classes.openClose}>
              {innerMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </Box>
          </SidebarListItem>

          <Collapse in={innerMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <SidebarListItem link="/account/business-details" isNested>
                <ListItemText
                  primaryTypographyProps={{
                    className: classes.text,
                  }}
                  primary="Founder"
                />
              </SidebarListItem>
              <SidebarListItem
                link={`/account/business-info/${firstBizSlug}`}
                isNested
              >
                <ListItemText
                  primaryTypographyProps={{
                    className: classes.text,
                  }}
                  primary="Info & Location"
                />
              </SidebarListItem>
              <SidebarListItem
                link={`/account/business-social/${firstBizSlug}`}
                isNested
              >
                <ListItemText
                  primaryTypographyProps={{
                    className: classes.text,
                  }}
                  primary="Social Media"
                />
              </SidebarListItem>
              <SidebarListItem
                link={`/account/business-price-point/${firstBizSlug}`}
                isNested
              >
                <ListItemText
                  primaryTypographyProps={{
                    className: classes.text,
                  }}
                  primary="Price Point"
                />
              </SidebarListItem>
              <SidebarListItem
                link={`/account/business-categories/${firstBizSlug}`}
                isNested
              >
                <ListItemText
                  primaryTypographyProps={{
                    className: classes.text,
                  }}
                  primary="Categories"
                />
              </SidebarListItem>
              <SidebarListItem
                link={`/account/business-photos/${firstBizSlug}`}
                isNested
              >
                <ListItemText
                  primaryTypographyProps={{
                    className: classes.text,
                  }}
                  primary="Photos"
                />
              </SidebarListItem>
              <SidebarListItem
                link={`/account/business-events/${firstBizSlug}`}
                isNested
              >
                <ListItemText
                  primaryTypographyProps={{
                    className: classes.text,
                  }}
                  primary="Events"
                />
              </SidebarListItem>
              <SidebarListItem
                link={`/account/business-testimonials/${firstBizSlug}`}
                isNested
              >
                <ListItemText
                  primaryTypographyProps={{
                    className: classes.text,
                  }}
                  primary="Testimonials"
                />
              </SidebarListItem>
              <SidebarListItem
                link={`/account/business-promotions/${firstBizSlug}`}
                isNested
              >
                <ListItemText
                  primaryTypographyProps={{
                    className: classes.text,
                  }}
                  primary="Promotions"
                />
              </SidebarListItem>
            </List>
          </Collapse>
        </>
      )}
      <SidebarListItem link="/account/change-password" icon={<SecurityIcon />}>
        <ListItemText
          primaryTypographyProps={{
            className: classes.text,
          }}
          primary="Security & Privacy"
        />
      </SidebarListItem>
      <SidebarListItem link="/?TODO" icon={<FavoriteBorderIcon />}>
        <ListItemText
          primaryTypographyProps={{
            className: classes.text,
          }}
          primary="Manage Favorites"
        />
      </SidebarListItem>
    </List>
  );

  return (
    <Box height="100%">
      <Hidden mdUp implementation="css">
        <Drawer
          variant="permanent"
          open={open}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <Toolbar />

          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerToggle}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>

          {renderList()}
        </Drawer>
      </Hidden>

      <Hidden smDown implementation="css">
        {renderList()}
      </Hidden>
    </Box>
  );
};

export default AccountSidebar;
