import * as Yup from 'yup';
import { REQUIRED } from 'constants.js';

const NewsletterSchema = Yup.object().shape({
  email: Yup.string().email().required(REQUIRED),
  newsletterType: Yup.string(),
});

const DirectorySchema = Yup.object().shape({
  category: Yup.string().nullable(),
  pricePoint: Yup.string().nullable(),
  search: Yup.string().nullable(),
  location: Yup.string().nullable(),
});

export { NewsletterSchema, DirectorySchema };
