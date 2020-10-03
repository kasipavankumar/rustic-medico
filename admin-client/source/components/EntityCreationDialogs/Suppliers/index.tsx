import React, { FC, useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';

import NetworkService from '../../../services/networkService';
import { Transition, DialogTitle, DialogActions, DialogContent, FormControl } from '../core/DialogBase';
import RusticMedicoSnackbar from '../core/Snackbar';
import CreationFab from '../core/CreationFab';

const SupplierCreationForm: FC = () => {
  const textFieldVariant = 'filled';
  const initialFormValues = {
    name: '',
    address: '',
    contact_number: '',
  };
  const initialSnackbarState = {
    show: false,
    message: '',
  };

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(initialFormValues);
  const [snackbar, setSnackbar] = useState(initialSnackbarState);

  const networkService = new NetworkService('suppliers');

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
        router.replace('/data/suppliers');
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
      <CreationFab onClick={handleClickOpen} tooltipMessage="Create a new manufacturer" />

      <Dialog keepMounted TransitionComponent={Transition} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle title="supplier" id="manufacturer-creation-dialog" onClose={handleClose}>
          Create new supplier
        </DialogTitle>

        <DialogContent dividers>
          <FormControl fullWidth>
            <TextField type="text" name="name" label="Name" placeholder="Aniket HyperPharma LTD" variant={textFieldVariant} value={inputs.name} onChange={handleInputs} />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="text"
              name="address"
              label="Address"
              placeholder="GHIDC, Greater Hyderabad, TS"
              rowsMax={4}
              value={inputs.address}
              variant={textFieldVariant}
              onChange={handleInputs}
              multiline
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField type="tel" name="contact_number" label="Contact Number" placeholder="7772226669" variant={textFieldVariant} value={inputs.contact_number} onChange={handleInputs} />
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

export default SupplierCreationForm;
