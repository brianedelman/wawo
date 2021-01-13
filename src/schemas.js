import * as Yup from 'yup';
import { REQUIRED } from 'constants.js';

const NewsletterSchema = Yup.object().shape({
  email: Yup.string().email().required(REQUIRED),
  newsletterType: Yup.string(),
});

// eslint-disable-next-line import/prefer-default-export
export { NewsletterSchema };
