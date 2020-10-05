import React from 'react';
import { useRouter } from 'next/router';
import { Button, Dialog, Typography } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';

import ActionFab from '../core/ActionFab';
import SnackbarFeedback from '../core/SnackbarFeedback';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from '../core/Dialog/DialogBase';

import { IEntityUpdateFormProps } from './types';

import NetworkService from '../../services/networkService';
import { FormContext } from './UpdateFormContext';

const EntityUpdateForm: React.FC<IEntityUpdateFormProps> = ({
  entityName,
  dataToUpdate,
  DialogContentComponent,
}) => {
  const initialSnackbarState = {
    show: false,
    message: '',
  };

  const router = useRouter();
  const [displayForm, toggleDisplayForm] = React.useState<boolean>(false);
  const [_dataToUpdate, setDataToUpdate] = React.useState({});
  const [snackbar, setSnackbar] = React.useState(initialSnackbarState);

  /**
   * Network service will help post data to the server.
   */
  const networkService = new NetworkService(entityName);

  React.useEffect(() => {
    setDataToUpdate(dataToUpdate);
  }, [dataToUpdate]);

  /**
   * Only submit form if any of the inputs have change.
   */
  const handleEmployeeUpdation = React.useCallback(() => {
    const postData = async () => {
      try {
        const postDataSuccess = await networkService.updateData(_dataToUpdate);

        if (postDataSuccess) {
          closeForm();
          router.replace(`/data/${entityName}`);
          setSnackbar({
            show: true,
            message: `Updated ${dataToUpdate.name}.`,
          });
        }
      } catch (err) {
        setSnackbar({
          show: true,
          message: 'Could not update.',
        });
      }
    };

    postData();
  }, [_dataToUpdate]);

  /**
   * Event handler to open form.
   */
  const openForm = () => {
    toggleDisplayForm(true);
  };

  /**
   * Event handler to close form.
   */
  const closeForm = () => {
    toggleDisplayForm(false);
    setSnackbar(initialSnackbarState);
  };

  /**
   * Event handler for inputs.
   */
  const handleInputs = (e: React.ChangeEvent<any>) => {
    e.persist();

    setDataToUpdate({
      ..._dataToUpdate,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <ActionFab
        IconComponent={<Edit />}
        tooltipMessage={`Edit ${dataToUpdate.name}'s details`}
        onClick={openForm}
      />

      <FormContext.Provider
        value={{
          variant: 'filled',
          handleInputChange: handleInputs,
          initialValues: _dataToUpdate,
        }}
      >
        <Dialog keepMounted open={displayForm}>
          <DialogTitle
            tooltipMessage={`Cancel ${entityName} update process`}
            id={`${entityName}-update-form`}
            onClose={closeForm}
          >
            Edit {dataToUpdate.name}'s details
          </DialogTitle>

          <DialogContent dividers>{DialogContentComponent}</DialogContent>

          <DialogActions>
            <Button
              color="primary"
              variant="text"
              onClick={closeForm}
              disableElevation
            >
              <Typography variant="button">Cancel</Typography>
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleEmployeeUpdation}
              disableElevation
            >
              <Typography variant="button">Update</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </FormContext.Provider>

      <SnackbarFeedback show={snackbar.show} message={snackbar.message} />
    </>
  );
};

export default EntityUpdateForm;
