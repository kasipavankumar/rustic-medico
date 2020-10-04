import React from 'react';
import { MenuItem } from '@material-ui/core';
import UpdateFormBase from '../UpdateFormBase';
import { InputField, SelectField } from '../UpdateFormComponents';

interface IDataToUpdateLike {
  name: string;
  price: number;
  medical_description: string;
  image_link: string;
  manufacturing_date: string;
  expiry_date: string;
}

interface IDrugUpdateFormProps<DataToUpdateLike> {
  dataToUpdate: DataToUpdateLike;
}

const DrugUpdateForm: React.FC<IDrugUpdateFormProps<IDataToUpdateLike>> = ({ dataToUpdate }) => {
  return (
    <>
      <UpdateFormBase
        entityName="drugs"
        dataToUpdate={dataToUpdate}
        DialogContentComponent={
          <>
            <InputField type="text" label="Name" placeholder="Dettol Sanitizer" name="name" />
            <InputField type="number" label="Price" placeholder="62.00" name="price" />
            <InputField multiline type="text" label="Medical Description" placeholder="Used to kill germs." name="medical_description" />
            <InputField type="url" label="Image Link" placeholder="https://images.rustic-medico.ml/dettol-sanitizer.webp" name="image_link" />
            <InputField type="date" label="Manufacturing Date" placeholder="2020-05-05" name="manufacturing_date" />
            <InputField type="date" label="Expiry Date" placeholder="2022-05-05" name="expiry_date" />
          </>
        }
      />
    </>
  );
};

export default DrugUpdateForm;
