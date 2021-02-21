import clsx from 'clsx';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Slider from 'react-slick';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  image: {
    width: '100%',
  },
  prevNext: {
    width: '40px',
    height: '40px',
    padding: 0,
    position: 'absolute',
  },
  prev: {
    color: theme.palette.white,
    backgroundColor: theme.palette.salmon,
    left: '-50px',
  },
  next: {
    color: theme.palette.white,
    backgroundColor: theme.palette.salmon,
    right: '-50px',
  },
}));

function NextArrow(props) {
  // eslint-disable-next-line
  const { className, style, onClick } = props;
  const classes = useStyles();
  return (
    <IconButton
      onClick={onClick}
      className={clsx(className, classes.next, classes.prevNext)}
      style={{
        ...style,
      }}
    >
      <ChevronRightIcon style={{ fontSize: '40px' }} />
    </IconButton>
  );
}
function PrevArrow(props) {
  // eslint-disable-next-line
  const { className, style, onClick } = props;
  const classes = useStyles();
  return (
    <IconButton
      onClick={onClick}
      className={clsx(className, classes.prev, classes.prevNext)}
      style={{
        ...style,
      }}
    >
      <ChevronLeftIcon style={{ fontSize: '40px' }} />
    </IconButton>
  );
}

function ImageCarousel({ images }) {
  const classes = useStyles();

  const hasMultiImages = images.length > 1;
  const settings = {
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: hasMultiImages ? <PrevArrow /> : null,
    nextArrow: hasMultiImages ? <NextArrow /> : null,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          dots: hasMultiImages,
          nextArrow: null,
          prevArrow: null,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {images.map(img => (
        <div key={img.id}>
          <img className={classes.image} src={img.image} alt={img.alt} />
        </div>
      ))}
    </Slider>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.array,
};

ImageCarousel.defaultProps = {
  images: [],
};

export default ImageCarousel;
