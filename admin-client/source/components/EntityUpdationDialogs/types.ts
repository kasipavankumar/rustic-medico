import { TextFieldProps } from '@material-ui/core/TextField';

export interface IEntityUpdateFormProps {
  dataToUpdate: any;
  entityName: 'employees' | 'customers' | 'drugs' | 'manufacturers' | 'suppliers';
  DialogContentComponent: React.ReactNode;
}

export interface IFormContextType {
  variant: TextFieldProps['variant'];
  initialValues: any;
  handleInputChange: (e: React.ChangeEvent<any>) => void;
}
