import React, { FC } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface IRusticMedicoSnackbarProps {
  show: boolean;
  message: string;
  autoHideDuration?: number;
  onClose: () => void;
}

const RusticMedicoSnackbar: FC<IRusticMedicoSnackbarProps> = ({ show, message, onClose, autoHideDuration = 6000 }) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={show}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        message={message}
        action={
          <>
            <IconButton size="medium" aria-label="close" color="inherit" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default RusticMedicoSnackbar;
