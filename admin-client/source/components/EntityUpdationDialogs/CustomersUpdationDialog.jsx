import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Edit } from '@material-ui/icons';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { ADMIN_KEY, API_URL } from '../../config';

export default function CustomerUpdationDialog({ data }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState({});
  const [snackbar, setSnackbar] = useState({ show: false, message: '' });

  useEffect(() => {
    setDataToUpdate(data);
  }, [data]);

  const handleSnackbarClose = () => {
    setSnackbar({
      show: false,
      message: '',
    });
  };

  const handleRecordUpdation = useCallback(() => {
    Axios({
      method: 'PUT',
      url: `${API_URL}/api/admin/customers/update/one`,
      headers: {
        'Content-Type': 'application/json',
        'Admin-Key': ADMIN_KEY,
      },
      data: {
        customer: dataToUpdate,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('Updated!');
          setSnackbar({
            show: true,
            message: `Updated ${dataToUpdate.name}.`,
          });
          router.push('/data/customers');
          handleClose();
          return;
        }
      })
      .catch((err) => {
        setSnackbar({
          show: true,
          message: `Could not update ${dataToUpdate.name}.`,
        });
      });
  }, [dataToUpdate]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToUpdate(data);
  };

  return (
    <div>
      <Button startIcon={<Edit />} variant="contained" color="primary" disableElevation onClick={handleClickOpen}>
        Edit Record
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Record</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the details you want to update.</DialogContentText>
          <TextField
            fullWidth
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={dataToUpdate.name}
            onChange={(e) => {
              setDataToUpdate({
                ...dataToUpdate,
                name: e.target.value,
              });
            }}
          />
          <TextField
            fullWidth
            margin="dense"
            id="address"
            label="Address"
            type="text"
            value={dataToUpdate.address}
            onChange={(e) => {
              setDataToUpdate({
                ...dataToUpdate,
                address: e.target.value,
              });
            }}
          />
          <TextField
            fullWidth
            margin="dense"
            id="contact_number"
            label="Contact Number"
            type="number"
            value={dataToUpdate.contact_number}
            onChange={(e) => {
              setDataToUpdate({ ...dataToUpdate, contact_number: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRecordUpdation} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.show}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}
