import PropTypes from 'prop-types';
import axios from 'util/axios';
import { URLS } from 'constants.js';

import StreamField from 'components/streamfield/StreamField';

const Terms = ({ data }) => {
  if (!data?.body) return <></>;
  return (
    <>
      <StreamField stream={data?.body} />
    </>
  );
};

Terms.propTypes = {
  data: PropTypes.object,
};

Terms.defaultProps = {
  data: null,
};

export async function getStaticProps() {
  let data = { data: null };
  try {
    data = await axios.get(`${URLS.pagesFind}terms/`);
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

export default Terms;
