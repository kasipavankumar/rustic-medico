import React from 'react';
import UpdateFormBase from '../UpdateFormBase';
import { InputField } from '../UpdateFormComponents';

interface IDataToUpdateLike {
  name: string;
  address: string;
  contact_number: string;
}

interface ISupplierUpdateFormProps<DataToUpdateLike> {
  dataToUpdate: DataToUpdateLike;
}

const SupplierUpdateForm: React.FC<ISupplierUpdateFormProps<IDataToUpdateLike>> = ({ dataToUpdate }) => {
  return (
    <>
      <UpdateFormBase
        entityName="suppliers"
        dataToUpdate={dataToUpdate}
        DialogContentComponent={
          <>
            <InputField type="text" label="Full name" placeholder="John Doe" name="name" />
            <InputField multiline type="text" label="Address" placeholder="Jubliee Hills, Hyderabad, TS" name="address" />
            <InputField type="tel" label="Contact Number" placeholder="7772226669" name="contact_number" />
          </>
        }
      />
    </>
  );
};

export default SupplierUpdateForm;
