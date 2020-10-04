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

const DrugsCreationDialog: FC = () => {
  const textFieldVariant = 'filled';
  const initialFormValues = {
    name: '',
    price: '',
    manufacturing_date: '',
    expiry_date: '',
    medical_description: '',
    image_link: '',
    manufacturer_name: '',
    supplier_name: '',
  };
  const initialSnackbarState = {
    show: false,
    message: '',
  };

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(initialFormValues);
  const [snackbar, setSnackbar] = useState(initialSnackbarState);

  const networkService = new NetworkService('drugs');

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
        router.replace('/data/drugs');
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
      <CreationFab onClick={handleClickOpen} tooltipMessage="Create a new drug" />

      <Dialog keepMounted TransitionComponent={Transition} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle title="drug" id="drug-creation-dialog" onClose={handleClose}>
          Create new drug
        </DialogTitle>

        <DialogContent dividers>
          <FormControl fullWidth>
            <TextField type="text" name="name" label="Name" placeholder="Volini Spray" variant={textFieldVariant} value={inputs.name} onChange={handleInputs} />
          </FormControl>

          <FormControl fullWidth>
            <TextField type="number" name="price" label="Price" placeholder="62.00" variant={textFieldVariant} value={inputs.price} onChange={handleInputs} />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="date"
              name="manufacturing_date"
              label="Date of Manufacturing"
              placeholder="2020-11-07"
              variant={textFieldVariant}
              value={inputs.manufacturing_date}
              onChange={handleInputs}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField type="date" name="expiry_date" label="Expiry Date" placeholder="2020-11-07" variant={textFieldVariant} value={inputs.expiry_date} onChange={handleInputs} />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="text"
              name="medical_description"
              label="Medical Description"
              placeholder="Used as painkiller"
              rowsMax={4}
              value={inputs.medical_description}
              variant={textFieldVariant}
              onChange={handleInputs}
              multiline
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="url"
              name="image_link"
              label="Image URL"
              placeholder="https://images.rustic-medico.ml/ranbaxy-volini-spray.webp"
              variant={textFieldVariant}
              value={inputs.image_link}
              onChange={handleInputs}
            />
          </FormControl>

          <EntityDependencySelect entityName="manufacturers" name="manufacturer_name" value={inputs.manufacturer_name} label="Manufacturer" variant={textFieldVariant} onChange={handleInputs} />
          <EntityDependencySelect entityName="suppliers" name="supplier_name" value={inputs.supplier_name} label="Supplier" variant={textFieldVariant} onChange={handleInputs} />
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

export default DrugsCreationDialog;
