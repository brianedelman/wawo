import { URLS } from 'constants.js';
import PropTypes from 'prop-types';
import axios from 'util/axios';

function Businesses({
  listings,
  count,
  next,
  previous,
  page,
  perPage,
  totalPages,
}) {
  console.log(count);
  console.log(next);
  console.log(previous);
  console.log(page);
  console.log(perPage);
  console.log(totalPages);
  return (
    <ul>
      {listings.map(post => (
        <li>{post.name}</li>
      ))}
    </ul>
  );
}

export const getServerSideProps = async ({ query }) => {
  const currentPage = query.page || 1;

  const {
    data: { count, next, previous, page, perPage, totalPages, results },
  } = await axios.get(`${URLS.api.directory}?page=${currentPage}`);

  return {
    props: {
      count,
      next,
      previous,
      page,
      perPage,
      totalPages,
      listings: results,
    },
  };
};

Businesses.propTypes = {
  // TODO better proptypes
  listings: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  next: PropTypes.string.isRequired,
  previous: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Businesses;
