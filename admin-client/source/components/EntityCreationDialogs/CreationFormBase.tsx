import Router from 'next/router';
import pluralize from 'pluralize';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Add from '@material-ui/icons/Add';
import React, {
  FC,
  ChangeEvent,
  ReactNode,
  useState,
  useCallback,
} from 'react';

import {
  Transition,
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'components/core/Dialog/DialogBase';
import { FormContext } from 'components/EntityUpdationDialogs/UpdateFormContext';
import Fab from 'components/core/ActionFab';
import EntitiesFormBody from './EntitiesFormBody';

import NetworkService from 'services/networkService';

const initialFormValues = {
  customers: {
    name: '',
    address: '',
    contact_number: '',
    doctor_name: '',
    employee_name: '',
  },
  drugs: {
    name: '',
    price: '',
    manufacturing_date: '',
    expiry_date: '',
    medical_description: '',
    image_link: '',
    manufacturer_name: '',
    supplier_name: '',
  },
  employees: {
    name: '',
    address: '',
    contact_number: '',
    date_of_joining: '',
    shift: '',
  },
  manufacturers: {
    name: '',
    address: '',
    contact_number: '',
  },
  suppliers: {
    name: '',
    address: '',
    contact_number: '',
  },
};

interface ICreationFormBaseProps {
  entityName:
    | 'drugs'
    | 'employees'
    | 'customers'
    | 'manufacturers'
    | 'suppliers';
  DialogBodyComponent?: ReactNode;
}

const CreationFormBase: FC<ICreationFormBaseProps> = ({
  entityName,
  DialogBodyComponent,
}) => {
  const singularEntityName = pluralize(entityName, 1);
  const networkService = new NetworkService(entityName);

  const [isFormOpen, toggleFormOpen] = useState<boolean>(false);
  const [formInputs, setFormInputs] = useState<any>({});

  /**
   * Form submission handler.
   */
  const handleEntityCreation = useCallback((): void => {}, [formInputs]);

  const handleFormInputsChange = (e: ChangeEvent<any>): void => {
    e.persist();

    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Form show state toggles.
   */
  const handleFormOpen = (): void => toggleFormOpen(true);
  const handleFormClose = (): void => toggleFormOpen(false);

  return (
    <>
      <Fab
        tooltip
        tooltipMessage={`Create a new ${singularEntityName}`}
        onClick={handleFormOpen}
        IconComponent={<Add />}
      />

      <FormContext.Provider
        value={{
          variant: 'filled',
          initialValues: initialFormValues[entityName],
          handleInputChange: handleFormInputsChange,
        }}
      >
        <Dialog
          aria-labelledby="entity-creation-dialog"
          TransitionComponent={Transition}
          onClose={handleFormClose}
          open={isFormOpen}
        >
          <DialogTitle
            id={`${singularEntityName}-creation-form`}
            tooltipMessage={`Cancel ${singularEntityName} creation process`}
            onClose={handleFormClose}
          >
            Create new {singularEntityName}
          </DialogTitle>

          <DialogContent dividers>{EntitiesFormBody[entityName]}</DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              onClick={handleEntityCreation}
              color="primary"
              autoFocus
              disableElevation
            >
              <Typography variant="button">Create</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </FormContext.Provider>
    </>
  );
};

export default CreationFormBase;
