import PropTypes from 'prop-types';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import { useRef } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Router from 'next/router';

import Link from 'components/router/Link';
import { useCurrentUser, logOut } from 'models/user';

const AccountMenu = ({ linkClassName }) => {
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
            {...bindTrigger(profileMenuState)}
          >
            <AccountCircle />
          </IconButton>
          <Menu id="menu-appbar" {...bindMenu(profileMenuState)}>
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
              Change Password
            </MenuItem>
            <MenuItem
              onClick={event =>
                handleMenuCloseWithLink({
                  event,
                  link: '/account/change-email',
                })
              }
            >
              Change Email
            </MenuItem>
            <MenuItem
              onClick={event =>
                handleMenuCloseWithLink({
                  event,
                  link: '/account/delete-account',
                })
              }
            >
              Delete Account
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
        <Link className={linkClassName} href="/sign-up">
          Sign Up
        </Link>
      )}
    </>
  );
};

AccountMenu.propTypes = {
  linkClassName: PropTypes.string.isRequired,
};

export default AccountMenu;
