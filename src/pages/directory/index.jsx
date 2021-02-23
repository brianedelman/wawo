import PropTypes from 'prop-types';
import axios from 'util/axios';
import { URLS } from 'constants.js';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import StreamField from 'components/streamfield/StreamField';

const DirectoryLanding = ({ data }) => {
  if (!data?.body) return <></>;
  const { meta } = data;
  const router = useRouter();
  const url = `${URLS.site}${router.asPath}`;

  return (
    <>
      <NextSeo
        title={meta.seoTitle}
        description={meta.searchDescription}
        openGraph={{
          url,
          title: meta.seoTitle,
          description: meta.searchDescription,
          images: [
            {
              url: meta.socialImage.scaledUrl,
              width: meta.socialImage.width,
              height: meta.socialImage.height,
              alt: meta.socialImage.alt || 'We Are Women Owned',
            },
          ],
          site_name: 'WAWO',
        }}
      />
      <StreamField stream={data?.body} />
    </>
  );
};

DirectoryLanding.propTypes = {
  data: PropTypes.object,
};

DirectoryLanding.defaultProps = {
  data: null,
};

export async function getStaticProps() {
  let data = { data: null };
  try {
    data = await axios.get(`${URLS.pagesFind}directory/`);
  } catch (e) {
    console.log('No page');
  }
  return {
    props: {
      data: data.data,
    },
    revalidate: 1,
  };
}

export default DirectoryLanding;
