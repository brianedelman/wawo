import * as Yup from 'yup';
import useSWR from 'swr';
import constate from 'constate';
import axios from 'util/axios';
import { URLS } from 'constants.js';
import { REQUIRED } from '../constants';

export const BusinessInfoSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED),
  description: Yup.string().required(REQUIRED),
  shortDescription: Yup.string().required(REQUIRED),
  businessUrl: Yup.string().required(REQUIRED),
  businessType: Yup.string().required(REQUIRED),
  locationType: Yup.string().required(REQUIRED),
  // TODO make these required if location type is physical
  address1: Yup.string(),
  address2: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  country: Yup.string(),
  postalCode: Yup.string(),
  storeHours: Yup.string(),
});

export const BusinessSocialSchema = Yup.object().shape({
  facebook: Yup.string(),
  instagram: Yup.string(),
  twitter: Yup.string(),
  youtube: Yup.string(),
});

export const BusinessPricePointSchema = Yup.object().shape({
  pricePoint: Yup.number(),
});

// TODO i think there might be a better more efficient setup for these pages
function useBusinessSWR({ user, slug }) {
  if (!user?.isBusinessUser || !slug) return {};
  const { data, error, mutate } = useSWR(
    `${URLS.api.directory}${slug}/`,
    query =>
      axios({
        method: 'get',
        url: query,
      }).then(response => response.data),
    { shouldRetryOnError: false, revalidateOnFocus: false }
  );

  const business = data;
  return { business, error, mutate };
}

export const [
  BusinessProvider,
  useBusiness,
  useBusinessError,
  useMutateNotifications,
] = constate(
  useBusinessSWR,
  value => value.business,
  value => value.error,
  value => value.mutate
);
