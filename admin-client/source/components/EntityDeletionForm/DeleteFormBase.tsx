import React, { FC, useEffect, useState, useCallback } from 'react';
import Router from 'next/router';
import { Button, Dialog, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { DialogTitle, DialogContent, DialogActions } from '../core/Dialog/DialogBase';
import SnackbarFeedback from '../core/SnackbarFeedback';
import ActionFab from '../core/ActionFab';

import NetworkService from '../../services/networkService';

interface IDeleteFormBaseProps {
  entityName: string;
  dataToDelete: any;
}

interface ISnackbarState {
  show: boolean;
  message: string;
}

const initialSnackbarState: ISnackbarState = {
  show: false,
  message: '',
};

const DeleteFormBase: FC<IDeleteFormBaseProps> = ({ entityName, dataToDelete }) => {
  const [showDialog, toggleShowDialog] = useState<boolean>(false);
  const [_dataToDelete, setDataToDelete] = useState<any>({});
  const [snackbar, setSnackbar] = useState<ISnackbarState>(initialSnackbarState);

  const networkService = new NetworkService(entityName);

  /**
   * Run whenever a new record ID is recieved in props.
   */
  useEffect(() => {
    setDataToDelete(dataToDelete);
    return () => setDataToDelete(null);
  }, [dataToDelete]);

  /**
   * Run only when dataToDelete is changed.
   */
  const handleRecordDeletion = useCallback(() => {
    const deleteRecord = async (): Promise<void> => {
      try {
        const deleteSucceeded = await networkService.deleteDate(dataToDelete);

        if (deleteSucceeded) {
          onDialogClose();
          Router.replace(`/data/${entityName}`);
          setSnackbar({
            show: true,
            message: `Deleted ${dataToDelete.name}'s record.`,
          });
        }
      } catch (err) {
        setSnackbar({
          show: true,
          message: `Could not delete ${dataToDelete.name}'s record.`,
        });
      }
    };

    deleteRecord();
  }, [_dataToDelete]);

  /**
   * Reset component's state.
   */
  const resetState = () => {
    toggleShowDialog(false);
    setSnackbar(initialSnackbarState);
  };

  /**
   * Event handler to handle dialog open.
   */
  const onDialogOpen = () => toggleShowDialog(true);

  /**
   * Event handler to handle dialog close.
   */
  const onDialogClose = () => resetState();

  return (
    <>
      <ActionFab IconComponent={<Delete />} onClick={onDialogOpen} tooltipMessage={`Delete ${_dataToDelete.name}'s details`} />

      <Dialog open={showDialog}>
        <DialogTitle id={`${entityName}-delete-form`} tooltipMessage={`Cancel ${entityName} deletion process`} onClose={onDialogClose}>
          Delete {_dataToDelete.name}'s record
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="body1">
            Are you sure you want to delete {_dataToDelete.name}'s record? <br />
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleRecordDeletion} disableElevation>
            <Typography variant="button">Delete</Typography>
          </Button>
        </DialogActions>
      </Dialog>

      <SnackbarFeedback show={snackbar.show} message={snackbar.message} />
    </>
  );
};

export default DeleteFormBase;
