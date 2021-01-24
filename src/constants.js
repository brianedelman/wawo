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
const URLS = {
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
    directorySlugs: `${DIRECTORY_BASE}business-slugs/`,
    categories: `${DIRECTORY_BASE}categories/`,
  },
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
});

const BUSINESS_IMAGE_PROPS = shape({
  id: number.isRequired,
  image: string.isRequired,
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
  businessType: string.isRequired,
  pricePoint: string,
  mainImage: string.isRequired,
  images: arrayOf(BUSINESS_IMAGE_PROPS),
  locationType: string.isRequired,
  location: string,
});

const PROPTYPES = {
  business: BUSINESS_PROPS,
  category: BUSINESS_CATEGORY_PROPS,
};

export {
  TOO_SHORT,
  TOO_LONG,
  REQUIRED,
  EMAIL,
  GENERIC_FIELD_ERROR,
  URLS,
  PROPTYPES,
};
