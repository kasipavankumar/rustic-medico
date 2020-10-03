import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiFormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

import Tooltip from '@material-ui/core/Tooltip';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { DialogTitleProps } from './types';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export const Transition = React.forwardRef(function Transition(props: TransitionProps & { children?: React.ReactElement<any, any> }, ref: React.Ref<unknown>) {
  return <Grow ref={ref} {...props} />;
});

export const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { title, children, classes, onClose, ...other } = props;
  const tooltipMessage = `Cancel ${title ? title : ' '} creation process`;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <Tooltip title={tooltipMessage}>
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const FormControl = withStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}))(MuiFormControl);
