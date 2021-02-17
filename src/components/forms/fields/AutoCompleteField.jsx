import PropTypes from 'prop-types';
import { useField, Field, useFormikContext } from 'formik';
import {
  FormControl,
  TextField,
  CircularProgress,
  FormHelperText,
} from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { Autocomplete } from 'formik-material-ui-lab';

const AutoCompleteField = ({
  fullWidth,
  formControlClassName,
  optionLabel,
  label,
  callback,
  value,
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

  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await callback();
      const callbackOptions = await response;

      if (active) {
        setOptions(callbackOptions);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, callback]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
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
        renderInput={params => (
          <TextField
            {...params}
            fullWidth={fullWidth}
            error={isError}
            label={label}
            variant="filled"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
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
  callback: PropTypes.func.isRequired,
  errors: PropTypes.object,
  helperText: PropTypes.string,
};

AutoCompleteField.defaultProps = {
  fullWidth: true,
  formControlClassName: '',
  errors: {},
  value: null,
  helperText: '',
};

export default AutoCompleteField;
