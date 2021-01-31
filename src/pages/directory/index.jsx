import PropTypes from 'prop-types';
import axios from 'util/axios';
import { URLS } from 'constants.js';

import StreamField from 'components/streamfield/StreamField';

const DirectoryLanding = ({ data }) => {
  return (
    <>
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
  const { data } = await axios.get(`${URLS.pagesFind}directory/`);
  return {
    props: {
      data,
    },
    revalidate: 1,
  };
}

export default DirectoryLanding;
