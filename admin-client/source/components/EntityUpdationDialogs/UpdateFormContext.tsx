import React from 'react';
import { IFormContextType } from './types';

export const FormContext = React.createContext<IFormContextType>({
  variant: 'filled',
  initialValues: {},
  handleInputChange: (e: React.ChangeEvent<any>) => {},
});
