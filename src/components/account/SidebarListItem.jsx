import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ListItem, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'components/router/Link';

const useStyles = makeStyles(theme => ({
  listItemButton: {
    paddingLeft: 0,
    paddingRight: 0,
    '& .MuiListItemIcon-root': {
      paddingBottom: theme.spacing(1),
      minWidth: '40px',
    },
    '& .active': {
      borderBottom: `1px solid ${theme.palette.grey[500]}`,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  text: {
    fontSize: theme.typography.pxToRem(14),
  },
}));

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

const SidebarListItem = ({
  children,
  link,
  handleClick,
  isNested,
  icon,
  listItemClassName,
}) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      className={clsx(
        isNested && classes.nested,
        classes.listItemButton,
        listItemClassName && listItemClassName
      )}
      dense={isNested}
      onClick={handleClick}
    >
      {link ? (
        <ListItemLink href={link} matchParent={isNested}>
          <ListItemIcon>{icon}</ListItemIcon>
          {children}
        </ListItemLink>
      ) : (
        <>
          <ListItemIcon>{icon}</ListItemIcon>
          {children}
        </>
      )}
    </ListItem>
  );
};

SidebarListItem.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
  handleClick: PropTypes.func,
  isNested: PropTypes.bool,
  icon: PropTypes.node,
  listItemClassName: PropTypes.string,
};

SidebarListItem.defaultProps = {
  isNested: false,
  icon: null,
  link: null,
  handleClick: () => null,
  listItemClassName: '',
};

export default SidebarListItem;
