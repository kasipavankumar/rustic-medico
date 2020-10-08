import React from 'react';

import {
  InputField,
  SelectField,
} from 'components/EntityUpdationDialogs/UpdateFormComponents';
import { FormControl } from 'components/core/Dialog/DialogBase';
import EntityDependencySelect from 'components/EntityCreationDialogs/core/EntityDependencySelect';

const EntitiesFormBody = {
  customers: (
    <>
      <FormControl fullWidth>
        <InputField
          type="text"
          name="name"
          label="Full name"
          placeholder="John Doe"
        />
      </FormControl>

      {/* Customer's address */}
      <FormControl fullWidth>
        <InputField
          type="text"
          name="address"
          label="Address"
          placeholder="Street 5, Hyderabad, TS"
          rowsMax={4}
          multiline
        />
      </FormControl>

      {/* Customer's contact number */}
      <FormControl fullWidth>
        <InputField
          type="tel"
          name="contact_number"
          label="Contact Number"
          placeholder="7772226669"
        />
      </FormControl>

      {/* Dependents Selects */}
      <EntityDependencySelect
        entityName="doctors"
        name="doctor_name"
        label="Doctor name"
      />
      <EntityDependencySelect
        entityName="employees"
        name="employee_name"
        label="Employee name"
      />
    </>
  ),
};

export default EntitiesFormBody;
