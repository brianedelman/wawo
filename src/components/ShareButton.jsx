import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
} from 'react-share';

const useStyles = makeStyles(theme => ({
  button: {
    marginBottom: theme.spacing(2),
    maxWidth: '180px',
    width: '100%',
  },
}));

function ShareButton({ shareTitle, shareMedia }) {
  const classes = useStyles();

  const [shareUrl, setShareUrl] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleShareMenu = event => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseShareMenu = () => {
    setMenuAnchor(null);
  };

  useEffect(() => {
    setShareUrl(`${window.location.href}`);
  }, []);

  return (
    <>
      <Button
        onClick={handleShareMenu}
        className={classes.button}
        variant="outlined"
        size="large"
        aria-controls="share-buttons-menu"
      >
        Share
      </Button>
      <Menu
        id="share-buttons-menu"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseShareMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        keepMounted
      >
        <MenuItem className="sharethis-menu-item">
          <FacebookShareButton url={shareUrl} quote={shareTitle}>
            <FacebookIcon size={32} />
          </FacebookShareButton>
        </MenuItem>
        <MenuItem className="sharethis-menu-item">
          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <TwitterIcon size={32} />
          </TwitterShareButton>
        </MenuItem>
        <MenuItem className="sharethis-menu-item">
          <PinterestShareButton
            url={shareUrl}
            description={shareTitle}
            media={shareMedia}
          >
            <PinterestIcon size={32} />
          </PinterestShareButton>
        </MenuItem>
        <MenuItem className="sharethis-menu-item">
          <EmailShareButton url={shareUrl} subject={shareTitle}>
            <EmailIcon size={32} />
          </EmailShareButton>
        </MenuItem>
      </Menu>
    </>
  );
}

ShareButton.propTypes = {
  shareTitle: PropTypes.string.isRequired,
  shareMedia: PropTypes.string.isRequired,
};

export default ShareButton;
