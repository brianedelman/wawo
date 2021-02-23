// STRINGS (MESSAGES)
import { shape, number, bool, string, arrayOf } from 'prop-types';

const TOO_SHORT = 'Item is Too Short!';
const TOO_LONG = 'Item is Too Long!';
const REQUIRED = 'This Field is Required!';
const EMAIL = 'Invalid Email';
const GENERIC_FIELD_ERROR = "Something's not right";

const API_BASE = '/backend/';
const DIRECTORY_BASE = `${API_BASE}directory/`;
// TODO: this is a temporary mapping to external/internal urls as we build things out
// TODO site should make sure to match whatever the domain is
const URLS = {
  site: 'https://directory.wearewomenowned.com', // NOTE: no trailing slash
  about: 'https://www.wearewomenowned.com/about/',
  contact: 'https://www.wearewomenowned.com/contact/',
  events: {
    month: 'https://www.wearewomenowned.com/events/month/',
    pastEvents: 'https://www.wearewomenowned.com/gallery/',
  },
  blog: {
    founderFeatures: 'https://www.wearewomenowned.com/category/features/',
    retail: 'https://www.wearewomenowned.com/category/retail/',
    marketing: 'https://www.wearewomenowned.com/category/marketing/',
    wellness: 'https://www.wearewomenowned.com/category/wellness/',
  },
  covid: 'https://www.wearewomenowned.com/covid19-resources/',
  sisterhood: {
    become: 'https://members.wearewomenowned.com/',
    members: 'https://www.wearewomenowned.com/members/',
    host: 'https://wearewomenowned.typeform.com/to/u5FtCher',
    login:
      'https://members.wearewomenowned.com/sign_in?from=https%3A%2F%2Fmembers.wearewomenowned.com%2F',
  },
  press: 'https://www.wearewomenowned.com/press/',
  conditions: 'https://www.wearewomenowned.com/terms-and-conditions/',
  termsUse: 'https://www.wearewomenowned.com/terms-of-use/',
  privacy: 'https://www.wearewomenowned.com/privacy-policy/',
  api: {
    directory: `${DIRECTORY_BASE}businesses/`,
    categories: `${DIRECTORY_BASE}categories/`,
    userMe: '/auth/users/me/',
  },
  pagesFind: '/api/v2/pages/find/?html_path=',
};

const BUSINESS_USER_PROPS = shape({
  id: number.isRequired,
  email: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  about: string.isRequired,
  founderFirstName: string,
  founderLastName: string,
  founderTitle: string,
  displayFounderInformation: bool.isRequired,
  profileImage: string.isRequired,
});

const BUSINESS_CATEGORY_PROPS = shape({
  name: string.isRequired,
  slug: string.isRequired,
  image: string,
  colorHex: string.isRequired,
});

const BUSINESS_IMAGE_PROPS = shape({
  id: number.isRequired,
  image: string.isRequired,
});

const BUSINESS_EVENT_PROPS = shape({
  description: string.isRequired,
  image: string,
  link: string,
  location: string.isRequired,
  name: string.isRequired,
  when: string.isRequired,
});

const BUSINESS_TESTIMONIAL_PROPS = shape({
  quote: string.isRequired,
  personName: string.isRequired,
  personTitle: string.isRequired,
});

const BUSINESS_PROPS = shape({
  id: number.isRequired,
  founder: BUSINESS_USER_PROPS.isRequired,
  name: string.isRequired,
  description: string.isRequired,
  shortDescription: string.isRequired,
  facebook: string,
  youtube: string,
  twitter: string,
  businessUrl: string.isRequired,
  categories: arrayOf(BUSINESS_CATEGORY_PROPS),
  businessTypeDisplay: string.isRequired,
  businessType: string.isRequired,
  pricePoint: number,
  pricePointDisplay: string,
  mainImage: string.isRequired,
  images: arrayOf(BUSINESS_IMAGE_PROPS),
  locationTypeDisplay: string.isRequired,
  locationType: string.isRequired,
  location: string,
  events: arrayOf(BUSINESS_EVENT_PROPS),
  testimonials: arrayOf(BUSINESS_TESTIMONIAL_PROPS),
});

const PROPTYPES = {
  business: BUSINESS_PROPS,
  founder: BUSINESS_USER_PROPS,
  category: BUSINESS_CATEGORY_PROPS,
  event: BUSINESS_EVENT_PROPS,
  testimonial: BUSINESS_TESTIMONIAL_PROPS,
};

const BUSINESS_TYPES = {
  product: 'PDCT',
  service: 'SRVC',
  nonProfit: 'NPFT',
};

export {
  BUSINESS_TYPES,
  TOO_SHORT,
  TOO_LONG,
  REQUIRED,
  EMAIL,
  GENERIC_FIELD_ERROR,
  URLS,
  PROPTYPES,
};
