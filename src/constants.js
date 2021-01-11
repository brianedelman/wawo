// STRINGS (MESSAGES)
const TOO_SHORT = 'Item is Too Short!';
const TOO_LONG = 'Item is Too Long!';
const REQUIRED = 'This Field is Required!';
const EMAIL = 'Invalid Email';
const GENERIC_FIELD_ERROR = "Something's not right";

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
};

export { TOO_SHORT, TOO_LONG, REQUIRED, EMAIL, GENERIC_FIELD_ERROR, URLS };
