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
import { Fab, Tooltip } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { ADMIN_KEY, API_URL } from '../../config';

const DrugsUpdationDialog = ({ data }) => {
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
      url: `${API_URL}/api/admin/drugs/update/one`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Admin-Key': ADMIN_KEY,
      },
      data: {
        drug: dataToUpdate,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setSnackbar({
            show: true,
            message: `Updated ${dataToUpdate.name}.`,
          });
          router.replace('/data/drugs');
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
      <Tooltip title={`Edit ${dataToUpdate.name}'s record`}>
        <Fab size="medium" color="secondary" onClick={handleClickOpen}>
          <Edit />
        </Fab>
      </Tooltip>
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
            id="price"
            label="Price"
            type="number"
            value={dataToUpdate.price}
            onChange={(e) => {
              setDataToUpdate({
                ...dataToUpdate,
                price: e.target.value,
              });
            }}
          />
          <TextField
            fullWidth
            multiline
            margin="dense"
            id="medical_description"
            label="Medical Description"
            type="text"
            value={dataToUpdate.medical_description}
            onChange={(e) => {
              setDataToUpdate({ ...dataToUpdate, medical_description: e.target.value });
            }}
          />
          <TextField
            fullWidth
            multiline
            margin="dense"
            id="image_link"
            label="Image Link"
            type="text"
            value={dataToUpdate.image_link}
            onChange={(e) => {
              setDataToUpdate({ ...dataToUpdate, image_link: e.target.value });
            }}
          />
          <TextField
            fullWidth
            margin="dense"
            id="manufacturing_date"
            label="Manufacturing Date"
            type="date"
            value={dataToUpdate.manufacturing_date}
            onChange={(e) => {
              setDataToUpdate({ ...dataToUpdate, manufacturing_date: e.target.value });
            }}
          />
          <TextField
            fullWidth
            margin="dense"
            id="expiry_date"
            label="Expiry Date"
            type="date"
            value={dataToUpdate.expiry_date}
            onChange={(e) => {
              setDataToUpdate({ ...dataToUpdate, expiry_date: e.target.value });
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
};

export default DrugsUpdationDialog;
