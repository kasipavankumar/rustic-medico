import React, { FC, useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface IRusticMedicoSnackbarProps {
  show: boolean;
  message: string;
  autoHideDuration?: number;
}

const RusticMedicoSnackbar: FC<IRusticMedicoSnackbarProps> = ({ show, message, autoHideDuration = 6000 }) => {
  const [open, toggleOpen] = useState<boolean>(false);

  useEffect(() => {
    toggleOpen(show);
  }, [show]);

  const closeSnackbar = () => {
    toggleOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={closeSnackbar}
        message={message}
        action={
          <>
            <IconButton size="medium" aria-label="close" color="inherit" onClick={closeSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default RusticMedicoSnackbar;
