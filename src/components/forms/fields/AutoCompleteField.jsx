import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { useField, Field, useFormikContext } from 'formik';
import { useSWRInfinite } from 'swr';

import {
  FormControl,
  TextField,
  CircularProgress,
  FormHelperText,
} from '@material-ui/core';

import React, { useEffect, useState, useCallback } from 'react';
import { Autocomplete } from 'formik-material-ui-lab';
import axios from 'util/axios';

const getKey = (
  pageIndex,
  previousPageData,
  callbackURL,
  internalValue,
  searchField
) => {
  // NOTE: this function returns the URL of the GET plus any pagination or searching.
  // The key is what tells SWR to use the same data previously returned or not if this changes
  if (
    (previousPageData && !previousPageData.results?.length) ||
    previousPageData?.next === null
  ) {
    return null; // reached the end
  }

  let search = '';
  if (internalValue && searchField) {
    search = `&${searchField}=${internalValue}`;
  }
  return `${callbackURL}?page=${pageIndex + 1}${search}`; // SWR key
};

const handleCallback = url => {
  return axios.get(url).then(rsp => rsp.data);
};

/*
  *
  NOTE: This autocomplete field is meant to be used in the context of a Formik form. It is capable of handling
  GET's to different URLs, pagination, and searching against that same URL. Search can be turned off if you want
  to save requests.
  *
*/
const AutoCompleteField = ({
  fullWidth,
  formControlClassName,
  optionLabel,
  label,
  callbackURL,
  value,
  searchField,
  enableSearch,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { name, errors, helperText } = props;
  const isError = Boolean(
    (meta.error && meta.touched) || meta.initialError || errors[name]
  );
  // NOTE: deleting this because it gets ...rest spread in and react gets mad
  // eslint-disable-next-line
  delete props.helperText;

  const { setFieldValue, setTouched } = useFormikContext();

  const [options, setOptions] = useState([]); // options for dropdown
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // NOTE: value of text field (separate from formik Field value). This is used for searching
  const [internalValue, setInternalValue] = useState(value || '');

  // NOTE: useSWR infinite is a fancy way to return multiple sets of data with SWR
  const { data, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      return getKey(
        pageIndex,
        previousPageData,
        callbackURL,
        internalValue,
        searchField
      );
    },
    handleCallback,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data?.length) {
      // NOTE: data is an array of different api responses so we first grab the results out of each response object
      const newOptions = data.map(item => item.results);
      // And then flatten out the resulting array
      setOptions(newOptions.flat(1));
      setLoading(false);
    }
  }, [data]);

  // NOTE: Search is debounced to 500 ms to save on queries, modify this as needed
  const handleSearch = useCallback(
    debounce(newValue => setInternalValue(newValue), 500),
    []
  );

  useEffect(() => {
    // Loading is true if we are open and have no options
    setLoading(open && options.length === 0);
    // if it's open and there are options already, clear the internal value
    // NOTE: this will trigger another search if search is enabled assuming there was an internalValue before
    if (!open && options.length) {
      setInternalValue('');
    }
  }, [open]);

  useEffect(() => {
    // Set field value on load
    if (value) {
      setFieldValue(value);
    }
  }, []);

  return (
    <FormControl
      fullWidth={fullWidth}
      variant="outlined"
      error={isError}
      className={formControlClassName}
    >
      <Field
        component={Autocomplete}
        options={options}
        getOptionLabel={optionLabel}
        onChange={(_, val) => setFieldValue(field.name, val)}
        onBlur={() => setTouched({ [field.name]: true })}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        ListboxProps={{
          style: {
            maxHeight: '200px',
          },
          onScroll: event => {
            const listboxNode = event.currentTarget;
            if (
              listboxNode.scrollTop + listboxNode.clientHeight ===
              listboxNode.scrollHeight
            ) {
              setSize(size + 1);
            }
          },
        }}
        renderInput={params => (
          <TextField
            {...params}
            fullWidth={fullWidth}
            error={isError}
            label={label}
            variant="filled"
            onChange={e => {
              if (enableSearch) {
                setLoading(true);
                handleSearch(e.target.value);
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        {...props}
      />
      {(isError || helperText) && (
        <FormHelperText>
          {isError
            ? meta.error || meta.initialError || errors[name]
            : helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

AutoCompleteField.propTypes = {
  label: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  formControlClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  optionLabel: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  callbackURL: PropTypes.string.isRequired, // the url to do a GET request to, handled with Axios and expects DRF format
  errors: PropTypes.object,
  searchField: PropTypes.string, // the name of the field to search in the backend
  enableSearch: PropTypes.bool, // set to false to disable any outside queries for searching
  helperText: PropTypes.string,
};

AutoCompleteField.defaultProps = {
  fullWidth: true,
  formControlClassName: '',
  errors: {},
  value: null,
  searchField: 'search',
  enableSearch: true,
  helperText: '',
};

export default AutoCompleteField;
