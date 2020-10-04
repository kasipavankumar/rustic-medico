import React, { FC, useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from 'next/router';

import NetworkService from '../../../services/networkService';
import { Transition, DialogTitle, DialogActions, DialogContent, FormControl } from '../core/DialogBase';
import RusticMedicoSnackbar from '../core/Snackbar';
import CreationFab from '../core/CreationFab';

const employeesJobShifts = ['Morning', 'Afternoon', 'Night'];

const EntityCreationForm: FC = () => {
  const textFieldVariant = 'filled';
  const initialFormValues = {
    name: '',
    address: '',
    contact_number: '',
    date_of_joining: '',
    shift: '',
  };

  const initialSnackbarState = {
    show: false,
    message: '',
  };

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(initialFormValues);
  const [snackbar, setSnackbar] = useState(initialSnackbarState);

  const networkService = new NetworkService('employees');

  const handleCustomerCreation = useCallback(() => {
    const postData = async () => {
      try {
        const postDataSuccess = await networkService.postData(inputs);

        if (!postDataSuccess) {
          setSnackbar({
            show: true,
            message: 'Could not post data.',
          });

          return;
        }

        handleClose();
        setSnackbar({
          show: true,
          message: `Added ${inputs.name}.`,
        });
        router.replace('/data/employees');
      } catch (err) {
        setSnackbar({
          show: true,
          message: 'Could not post data.',
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
      <CreationFab onClick={handleClickOpen} tooltipMessage="Create a new employee" />

      <Dialog keepMounted TransitionComponent={Transition} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle title="employee" id="employee-creation-dialog" onClose={handleClose}>
          Create new employee
        </DialogTitle>

        <DialogContent dividers>
          {/* Employee's full name */}
          <FormControl fullWidth>
            <TextField type="text" name="name" label="Full name" placeholder="John Doe" variant={textFieldVariant} value={inputs.name} onChange={handleInputs} />
          </FormControl>

          {/* Employee's address */}
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

          {/* Employee's contact number */}
          <FormControl fullWidth>
            <TextField type="tel" name="contact_number" label="Contact Number" placeholder="7772226669" variant={textFieldVariant} value={inputs.contact_number} onChange={handleInputs} />
          </FormControl>

          {/* Employee's Date of joining */}
          <FormControl fullWidth>
            <TextField type="date" name="date_of_joining" label="Date of joining" placeholder="2020-11-07" variant={textFieldVariant} value={inputs.date_of_joining} onChange={handleInputs} />
          </FormControl>

          <FormControl variant={textFieldVariant} fullWidth>
            <InputLabel>Shift</InputLabel>
            <Select name="shift" value={inputs.shift} onChange={handleInputs}>
              {employeesJobShifts.map((shift) => (
                <MenuItem key={shift} value={shift}>
                  {shift}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default EntityCreationForm;
