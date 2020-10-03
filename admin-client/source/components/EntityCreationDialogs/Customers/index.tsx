import React, { FC, useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';

import NetworkService from '../../../services/networkService';
import EntityDependencySelect from '../core/EntityDependencySelect';
import { Transition, DialogTitle, DialogActions, DialogContent, FormControl } from '../core/DialogBase';
import RusticMedicoSnackbar from '../core/Snackbar';
import CreationFab from '../core/CreationFab';

const CustomerCreationForm: FC = () => {
  const textFieldVariant = 'filled';
  const initialFormValues = {
    name: '',
    address: '',
    contact_number: '',
    doctor_name: '',
    employee_name: '',
  };
  const initialSnackbarState = {
    show: false,
    message: '',
  };

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(initialFormValues);
  const [snackbar, setSnackbar] = useState(initialSnackbarState);

  const networkService = new NetworkService('customers');

  const handleCustomerCreation = useCallback(() => {
    const postData = async () => {
      try {
        const postDataSuccess = await networkService.postData(inputs);

        if (!postDataSuccess) {
          setSnackbar({
            show: true,
            message: 'Could not post data',
          });

          return;
        }

        handleClose();
        setSnackbar({
          show: true,
          message: `Added ${inputs.name}`,
        });
        router.replace('/data/customers');
      } catch (err) {
        setSnackbar({
          show: true,
          message: 'Could not post data',
        });
        console.log(err);
      }
    };

    postData();
  }, [inputs]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputs(initialFormValues);
  };

  const handleSnackbarClose = () => {
    setSnackbar(initialSnackbarState);
  };

  const handleInputs = (event: React.ChangeEvent<any>): void => {
    event.persist();

    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <CreationFab onClick={handleClickOpen} tooltipMessage="Create a new customer" />

      <Dialog keepMounted TransitionComponent={Transition} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle title="customer" id="customized-dialog-title" onClose={handleClose}>
          Create new customer
        </DialogTitle>

        <DialogContent dividers>
          {/* Customer's full name */}
          <FormControl fullWidth>
            <TextField type="text" name="name" label="Full name" placeholder="John Doe" variant={textFieldVariant} value={inputs.name} onChange={handleInputs} />
          </FormControl>

          {/* Customer's address */}
          <FormControl fullWidth>
            <TextField
              type="text"
              name="address"
              label="Address"
              placeholder="Street 5, Hyderabad, TS"
              rowsMax={4}
              value={inputs.address}
              variant={textFieldVariant}
              onChange={handleInputs}
              multiline
            />
          </FormControl>

          {/* Customer's contact number */}
          <FormControl fullWidth>
            <TextField type="tel" name="contact_number" label="Contact Number" placeholder="7772226669" variant={textFieldVariant} value={inputs.contact_number} onChange={handleInputs} />
          </FormControl>

          {/* Dependents Selects */}
          <EntityDependencySelect entityName="doctors" name="doctor_name" value={inputs.doctor_name} label="Doctor name" variant={textFieldVariant} onChange={handleInputs} />
          <EntityDependencySelect entityName="employees" name="employee_name" value={inputs.employee_name} label="Employee name" variant={textFieldVariant} onChange={handleInputs} />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleCustomerCreation} color="primary" autoFocus disableElevation>
            <Typography variant="button">Save</Typography>
          </Button>
        </DialogActions>
      </Dialog>

      <RusticMedicoSnackbar show={snackbar.show} message={snackbar.message} onClose={handleSnackbarClose} />
    </>
  );
};

export default CustomerCreationForm;
