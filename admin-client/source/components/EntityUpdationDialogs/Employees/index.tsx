import React from 'react';
import { MenuItem } from '@material-ui/core';
import UpdateFormBase from '../UpdateFormBase';
import { InputField, SelectField } from '../UpdateFormComponents';

interface IDataToUpdateLike {
  name: string;
  address: string;
  contact_number: string;
  shift: string;
}

interface IEmployeeUpdateFormProps {
  dataToUpdate: IDataToUpdateLike;
}

const EmployeeUpdateForm: React.FC<IEmployeeUpdateFormProps> = ({ dataToUpdate }) => {
  return (
    <>
      <UpdateFormBase
        entityName="employees"
        dataToUpdate={dataToUpdate}
        DialogContentComponent={
          <>
            <InputField type="text" label="Full name" placeholder="John Doe" name="name" />
            <InputField multiline type="text" label="Address" placeholder="Jubliee Hills, Hyderabad, TS" name="address" />
            <InputField type="tel" label="Contact Number" placeholder="7772226669" name="contact_number" />
            <SelectField name="shift" inputLabel="Shift">
              <MenuItem value="Morning">Morning</MenuItem>
              <MenuItem value="Afternoon">Afternoon</MenuItem>
              <MenuItem value="Night">Night</MenuItem>
            </SelectField>
          </>
        }
      />
    </>
  );
};

export default EmployeeUpdateForm;
