import PropTypes from 'prop-types';
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import { useRef } from 'react';
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Router from 'next/router';

// import Link from 'components/router/Link';
import { useCurrentUser, logOut } from 'models/user';

const AccountMenu = ({ linkClassName }) => {
  // TODO add back
  console.log(linkClassName);
  const anchorRef = useRef(null);
  const navMenuState = usePopupState({
    variant: 'popover',
    popupId: 'navMenu',
  });
  const profileMenuState = usePopupState({
    variant: 'popover',
    popupId: 'profileMenu',
  });
  const user = useCurrentUser();
  const handleMenuCloseWithLink = ({ event, link = '', callback = null }) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    if (link) {
      Router.push(link);
    }

    if (callback) {
      callback();
    }

    profileMenuState.close();
    navMenuState.close();
  };
  const logoutButtonClick = () => {
    logOut();
    profileMenuState.close();
  };

  return (
    <>
      {user ? (
        <>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            {...bindHover(profileMenuState)}
          >
            {user.profileImage ? (
              <Avatar
                alt={`${user.firstName} ${user.lastName}`}
                src={user.profileImage}
              />
            ) : (
              <AccountCircle />
            )}
            <ArrowDropDownIcon color="primary" />
          </IconButton>
          <Menu
            id="menu-appbar"
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            {...bindMenu(profileMenuState)}
          >
            <MenuItem
              onClick={event =>
                handleMenuCloseWithLink({
                  event,
                  link: '/account',
                })
              }
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={event =>
                handleMenuCloseWithLink({
                  event,
                  link: '/account/change-password',
                })
              }
            >
              Security & Privacy
            </MenuItem>
            <MenuItem
              onClick={event =>
                handleMenuCloseWithLink({
                  event,
                  callback: logoutButtonClick,
                })
              }
            >
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        /* <Link className={linkClassName} href="/sign-up"> */
        /*   Sign Up */
        /* </Link> */
        <></>
      )}
    </>
  );
};

AccountMenu.propTypes = {
  linkClassName: PropTypes.string.isRequired,
};

export default AccountMenu;
