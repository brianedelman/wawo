import PropTypes from 'prop-types';
import { Markup } from 'interweave';
import { Box, Container } from '@material-ui/core';

const CustomRichText = ({ stream }) => {
  const { text, alignment, containment } = stream;
  return (
    <Container maxWidth={containment}>
      <Box align={alignment}>
        <Markup content={text} />
      </Box>
    </Container>
  );
};

CustomRichText.propTypes = {
  stream: PropTypes.shape({
    text: PropTypes.string.isRequired,
    alignment: PropTypes.string.isRequired,
    containment: PropTypes.string.isRequired,
  }).isRequired,
};

export default CustomRichText;
