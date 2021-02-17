import { useState } from 'react';
import { Box, Paper, List, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import SecurityIcon from '@material-ui/icons/Security';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { useCurrentUser } from 'models/user';
import SidebarListItem from 'components/account/SidebarListItem';

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
}));

const AccountSidebar = () => {
  const classes = useStyles();
  const user = useCurrentUser();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box height="100%">
      <Paper elevation={0}>
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
                  {open ? <ExpandLess /> : <ExpandMore />}
                </Box>
              </SidebarListItem>

              <Collapse in={open} timeout="auto" unmountOnExit>
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
                    link={`/account/business-info/${user.businesses[0].slug}`}
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
                    link={`/account/business-social/${user.businesses[0].slug}`}
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
                    link={`/account/business-price-point/${user.businesses[0].slug}`}
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
                    link={`/account/business-categories/${user.businesses[0].slug}`}
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
                    link={`/account/business-photos/${user.businesses[0].slug}`}
                    isNested
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        className: classes.text,
                      }}
                      primary="Photos"
                    />
                  </SidebarListItem>
                </List>
              </Collapse>
            </>
          )}
          <SidebarListItem
            link="/account/change-password"
            icon={<SecurityIcon />}
          >
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
      </Paper>
    </Box>
  );
};

export default AccountSidebar;
