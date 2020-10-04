import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select/Select';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

import { FormContext } from './UpdateFormContext';
import { FormControl } from '../core/Dialog/DialogBase';

export const InputField: React.FC<TextFieldProps> = (props) => {
  const { handleInputChange, initialValues, variant } = React.useContext(FormContext);

  return (
    <>
      <FormControl fullWidth>
        <TextField variant={variant} onChange={handleInputChange} value={initialValues[props.name]} {...props} />
      </FormControl>
    </>
  );
};

export const SelectField: React.FC<SelectProps & { inputLabel: string }> = (props) => {
  const { handleInputChange, initialValues, variant } = React.useContext(FormContext);
  const { inputLabel, children, ...restProps } = props;

  return (
    <>
      <FormControl variant={variant} fullWidth>
        <InputLabel>{inputLabel}</InputLabel>
        <Select onChange={handleInputChange} value={initialValues[props.name]} {...restProps}>
          {children}
        </Select>
      </FormControl>
    </>
  );
};
