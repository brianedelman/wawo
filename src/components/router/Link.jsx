/* eslint-disable jsx-a11y/anchor-has-content, react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import isServer from 'util/isServer';
import { Button } from '@material-ui/core';

const NextComposed = React.forwardRef(function NextComposed(
  { as, href, ...other },
  ref
) {
  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  prefetch: PropTypes.bool,
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link({
  href,
  activeClassName = 'active',
  className: classNameProps,
  innerRef,
  variant,
  naked,
  componentType = 'link',
  matchParent = false,
  ...other
}) {
  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  let parentMatch = null;
  // TODO clean up
  if (matchParent) {
    const pathnameArray = pathname.split('/');
    pathnameArray.pop();
    const routerArray = router.asPath.split('/');
    routerArray.pop();
    parentMatch = routerArray.join('/') === pathnameArray.join('/');
  }
  const className = clsx(classNameProps, {
    [activeClassName]:
      router?.asPath === pathname || (parentMatch && activeClassName),
  });

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      />
    );
  }

  const isExternalLink = linkHref => {
    let newLinkHref = linkHref;
    const checkHref = `${window.location.protocol}//${window.location.host}`;
    if (newLinkHref?.pathname) {
      newLinkHref = newLinkHref.pathName;
    }
    return !(
      !newLinkHref ||
      newLinkHref[0] === '?' ||
      newLinkHref[0] === '/' ||
      newLinkHref[0] === '#' ||
      newLinkHref.startsWith(checkHref) ||
      newLinkHref.startsWith(window.location.host) ||
      newLinkHref.substring(0, 4) === 'tel:' ||
      newLinkHref.substring(0, 7) === 'mailto:'
    );
  };

  let target;
  if (!isServer()) {
    target = isExternalLink(href) ? '_blank' : null;
  }
  let LinkComponent = MuiLink;
  if (componentType === 'button') {
    LinkComponent = Button;
  }
  return (
    <LinkComponent
      target={target}
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href}
      variant={variant}
      {...other}
    />
  );
}

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  variant: PropTypes.string,
  componentType: PropTypes.oneOf(['button', 'link']),
  matchParent: PropTypes.bool,
};

export default React.forwardRef((props, ref) => (
  <Link {...props} innerRef={ref} />
));
