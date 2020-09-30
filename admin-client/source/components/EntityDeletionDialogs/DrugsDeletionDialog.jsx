import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { ADMIN_KEY, API_URL } from '../../config';
import { Fab, Tooltip } from '@material-ui/core';

export default function DrugsDeletionDialog({ data }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState({});
  const [snackbar, setSnackbar] = useState({ show: false, message: '' });

  useEffect(() => {
    setDataToDelete(data);
  }, [data]);

  const handleSnackbarClose = () => {
    setSnackbar({
      show: false,
      message: '',
    });
  };

  const handleRecordDeletion = useCallback(() => {
    Axios({
      method: 'DELETE',
      url: `${API_URL}/api/admin/drugs/delete/one?id=${dataToDelete.id}`,
      headers: {
        'Content-Type': 'application/json',
        'Admin-Key': ADMIN_KEY,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setDataToDelete({});
          router.reload();
          handleClose();
          setSnackbar({
            show: true,
            message: `Deleted ${dataToDelete.name}.`,
          });
          return;
        }
      })
      .catch((err) => {
        setSnackbar({
          show: true,
          message: `Could not delete ${dataToDelete.name}.`,
        });
      });
  }, [dataToDelete]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToDelete(data);
  };

  return (
    <div>
      <Tooltip title={`Delete ${dataToDelete.name}'s record`}>
        {/* TODO: Add error color to this FAB */}
        <Fab size="medium" color="secondary" onClick={handleClickOpen}>
          <Delete />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {dataToDelete.name}'s record? <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRecordDeletion} color="primary">
            Delete
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
