import React from 'react';
import { MenuItem } from '@material-ui/core';
import UpdateFormBase from '../UpdateFormBase';
import { InputField, SelectField } from '../UpdateFormComponents';
import EntityDependencySelect from '../../EntityCreationDialogs/core/EntityDependencySelect';

interface IDataToUpdateLike {
  name: string;
  address: string;
  contact_number: string;
  employee_name: string;
  doctor_name: string;
}

interface ICustomerUpdateFormProps<DataToUpdateLike> {
  dataToUpdate: DataToUpdateLike;
}

const CustomerUpdateForm: React.FC<ICustomerUpdateFormProps<IDataToUpdateLike>> = ({ dataToUpdate }) => {
  return (
    <>
      <UpdateFormBase
        entityName="customers"
        dataToUpdate={dataToUpdate}
        DialogContentComponent={
          <>
            <InputField type="text" label="Full name" placeholder="John Doe" name="name" />
            <InputField multiline type="text" label="Address" placeholder="Jubliee Hills, Hyderabad, TS" name="address" />
            <InputField type="tel" label="Contact Number" placeholder="7772226669" name="contact_number" />
            {/* <EntityDependencySelect entityName="employees" label="Employee Name" /> */}
          </>
        }
      />
    </>
  );
};

export default CustomerUpdateForm;
