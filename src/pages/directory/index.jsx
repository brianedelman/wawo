import PropTypes from 'prop-types';
import axios from 'util/axios';
import { URLS } from 'constants.js';

import StreamField from 'components/streamfield/StreamField';

const DirectoryLanding = ({ data }) => {
  if (!data?.body) return <></>;
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
  let data = { data: null };
  console.log('hiiiii');
  console.log(process.env.IS_CIRCLE);
  console.log(process.env.SERVER_BASE_URL);
  if (!process.env.IS_CIRCLE) {
    data = await axios.get(`${URLS.pagesFind}directory/`);
  }
  return {
    props: {
      data: data.data,
    },
    revalidate: 1,
  };
}

export default DirectoryLanding;
