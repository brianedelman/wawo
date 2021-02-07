import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import SecurityIcon from '@material-ui/icons/Security';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Link from 'components/router/Link';

const useStyles = makeStyles(theme => ({
  noPaddingTop: {
    paddingTop: 0,
  },
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
  text: {
    fontSize: theme.typography.pxToRem(14),
  },
}));

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

const AccountSidebar = () => {
  const classes = useStyles();
  return (
    <Box height="100%">
      <Paper elevation={0}>
        <List
          component="nav"
          aria-label="main navigation"
          className={classes.noPaddingTop}
        >
          <ListItem className={classes.listItemButton}>
            <ListItemLink href="/account" color="primary" variant="contained">
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  className: classes.text,
                }}
                primary="Edit Profile"
              />
            </ListItemLink>
          </ListItem>
          <ListItem className={classes.listItemButton}>
            <ListItemLink href="/account/change-password">
              <ListItemIcon>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  className: classes.text,
                }}
                primary="Security & Privacy"
              />
            </ListItemLink>
          </ListItem>
          <ListItem className={classes.listItemButton}>
            <ListItemLink href="/?TODO">
              <ListItemIcon>
                <FavoriteBorderIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  className: classes.text,
                }}
                primary="Manage Favorites"
              />
            </ListItemLink>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

// AccountSidebar.propTypes = {
// };

export default AccountSidebar;
