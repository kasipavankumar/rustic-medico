import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import { useRouter } from 'next/router';
import { fetchEntities } from '../../utils';
import { Fab, Grow } from '@material-ui/core';
import Axios from 'axios';
import { ADMIN_KEY, API_URL } from '../../config';

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  nameInputField: {
    maxWidth: '100%',
    width: 400,
    '& input': {
      fontSize: 24,
      lineHeight: 24,
    },
  },
  submitBtn: {
    marginLeft: '50px',
  },
  dialogRoot: {
    padding: '1.125rem',
  },
  spacer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  addCustomerFab: {
    position: 'fixed',
    bottom: '30px',
    left: 'unset',
    right: '30px',
    zIndex: 1,
  },
}));

export default function CustomerCreationDialog() {
  const initialCustomerState = {
    name: '',
    address: '',
    contactNumber: '',
    doctorName: '',
    employeeName: '',
  };

  const initialErrorState = {
    hasError: false,
    message: '',
  };

  const initialSnackbarState = {
    show: false,
    message: '',
  };

  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [doctors, setDoctors] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [isLoading, toggleIsLoading] = useState(false);
  const [customer, setCustomer] = useState(initialCustomerState);
  const [error, setError] = useState(initialErrorState);
  const [snackbar, setSnackbar] = useState(initialSnackbarState);

  const resetFormFields = () => {
    setCustomer(initialCustomerState);
  };

  useEffect(() => {
    try {
      Promise.all([fetchEntities('doctors'), fetchEntities('employees')])
        .then((data) => {
          const [doctors, employees] = data;

          setDoctors(doctors.entityData['doctors']);
          setEmployees(employees.entityData['employees']);
        })
        .catch(console.error);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleCustomerCreation = useCallback(() => {
    toggleIsLoading(true);

    const data = {
      customer: {
        name: customer.name,
        address: customer.address,
        contact_number: customer.contactNumber,
        doctor_name: customer.doctorName,
        employee_name: customer.employeeName,
      },
    };

    Axios({
      method: 'POST',
      url: `${API_URL}/api/admin/customers/add/one`,
      headers: {
        'Content-Type': 'application/json',
        'Admin-Key': ADMIN_KEY,
      },
      data,
    })
      .then((res) => {
        if (res.status !== 200) {
          toggleIsLoading(false);
          setError({
            hasError: true,
            message: 'Could not add customer.',
          });
          setSnackbar({
            show: true,
            message: error.message,
          });
          return;
        }

        toggleIsLoading(false);
        resetFormFields();
        setSnackbar({
          show: true,
          message: 'Added a new customer.',
        });
        setError(initialErrorState);
        handleClose();
        router.replace('/data/customers');
      })
      .catch((err) => {
        toggleIsLoading(false);
        setError({
          hasError: true,
          message: 'Something went wrong.',
        });
        setSnackbar({
          show: true,
          message: error.message,
        });
      });
  }, [customer]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    toggleIsLoading(false);
    resetFormFields();
    setSnackbar(initialSnackbarState);
    setError(initialErrorState);
  };

  return (
    <div>
      <Tooltip title="Add a new customer">
        <Fab size="medium" onClick={handleClickOpen} color="secondary">
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog fullScreen open={open} onClose={handleClose}>
        <Toolbar>
          <Tooltip title="Cancel customer creation">
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Tooltip>

          <TextField
            autoFocus
            className={classes.nameInputField}
            type="text"
            placeholder="Customer name"
            value={customer.name}
            onChange={(e) => {
              setCustomer({
                ...customer,
                name: e.target.value,
              });
            }}
          />
          <Tooltip title="Proceed with customer creation">
            <Button className={classes.submitBtn} variant="contained" color="primary" onClick={handleCustomerCreation} disableElevation>
              {isLoading ? 'Submitting' : 'Submit'}
            </Button>
          </Tooltip>
        </Toolbar>

        <List>
          <ListItem>
            <TextField
              fullWidth
              type="text"
              label="Address"
              inputMode="text"
              value={customer.address}
              onChange={(e) => {
                setCustomer({
                  ...customer,
                  address: e.target.value,
                });
              }}
            />
          </ListItem>
          <div className={classes.spacer}></div>
          <ListItem>
            <TextField
              fullWidth
              type="number"
              placeholder="Contact Number"
              value={customer.contactNumber}
              onChange={(e) => {
                setCustomer({
                  ...customer,
                  contactNumber: e.target.value,
                });
              }}
            />
          </ListItem>
          <div className={classes.spacer}></div>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Doctor</InputLabel>
              <Select
                placeholder="Doctor"
                value={customer.doctorName}
                onChange={(e) => {
                  setCustomer({
                    ...customer,
                    doctorName: e.target.value,
                  });
                }}
              >
                {doctors &&
                  doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </ListItem>
          <div className={classes.spacer}></div>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Employee</InputLabel>
              <Select
                placeholder="Employee"
                value={customer.employeeName}
                onChange={(e) => {
                  setCustomer({
                    ...customer,
                    employeeName: e.target.value,
                  });
                }}
              >
                {employees &&
                  employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.name}>
                      {employee.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </ListItem>
        </List>
      </Dialog>

      <Snackbar TransitionComponent={Grow} open={snackbar.show} message={snackbar.message} key="snackbar" />
    </div>
  );
}
