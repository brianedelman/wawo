import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import Menu from 'material-ui-popup-state/HoverMenu';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Button, MenuItem } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Router from 'next/router';

const useStyles = makeStyles(() => ({
  label: {
    fontWeight: 'normal',
    fontSize: '1rem',
  },
}));

const DropDownMenu = ({ menuName, items, linkClassName }) => {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const menuId = menuName.replace(/ /g, '');
  const navMenuState = usePopupState({
    variant: 'popover',
    popupId: `navMenu-${menuId}`,
  });

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

    navMenuState.close();
  };

  // TODO on click of button, close menu. had an issue with some menus staying open
  return (
    <>
      <Button
        className={linkClassName}
        classes={{
          label: classes.label,
        }}
        color="inherit"
        aria-label="menu"
        aria-controls={`menu-${menuId}`}
        aria-haspopup="true"
        {...bindHover(navMenuState)}
      >
        {menuName}
        {items.length > 0 && <ArrowDropDownIcon color="primary" />}
      </Button>
      <Menu
        id={`menu-${menuId}`}
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
      >
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            data-cy="login"
            className={linkClassName}
            onClick={event =>
              handleMenuCloseWithLink({
                event,
                link: item.link,
              })
            }
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

DropDownMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      link: PropTypes.string,
    })
  ),
  menuName: PropTypes.string.isRequired,
  linkClassName: PropTypes.string,
};

DropDownMenu.defaultProps = {
  items: [],
  linkClassName: '',
};

export default DropDownMenu;
