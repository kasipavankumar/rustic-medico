import React from 'react';
import { WithStyles } from '@material-ui/core/styles';
import { FormControlTypeMap } from '@material-ui/core/FormControl';
import { SelectProps } from '@material-ui/core/Select';
import { styles } from './DialogBase';

/**
 * Common types
 */
export type EntityLike =
  | 'drugs'
  | 'employees'
  | 'customers'
  | 'doctors'
  | 'manufacturers'
  | 'suppliers';

export interface IEntityCreationFormProps {
  entity: EntityLike;
  DialogBodyComponent: React.ReactNode;
  DialogActionComponent: React.ReactNode;
}

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  title?: string;
  closeTooltipMessage?: string;
  onClose: () => void;
}

/**
 * Dependents Selection types
 */
export interface IEntityDependentsSelectionProps {
  entityName: EntityLike;
  name?: string;
  value?: any;
  label?: string;
  variant?: FormControlTypeMap['props']['variant'];
  onChange?: SelectProps['onChange'];
}

export interface IEntityDataFetchResponse {
  data: any[];
  hasErrors: boolean;
}
