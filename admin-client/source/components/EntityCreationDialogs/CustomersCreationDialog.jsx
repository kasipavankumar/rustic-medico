import React, { useState, useEffect } from 'react';
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
import { fetchEntities, postEntityData } from '../../utils';
import { Grow } from '@material-ui/core';

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
}));

export default function CustomerCreationDialog() {
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [doctors, setDoctors] = useState(null);
    const [employees, setEmployees] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [isLoading, toggleIsLoading] = useState(false);
    const [hasErrors, toggleHasErrors] = useState(false);

    const resetFormFields = () => {
        setCustomerName('');
        setAddress('');
        setContactNumber('');
        setDoctorName('');
        setEmployeeName('');
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

    const handleDataSubmission = () => {
        toggleIsLoading(true);

        if (!customerName.length || !contactNumber.length || !employeeName.length || !doctorName.length || !address.length) {
            toggleIsLoading(false);
            toggleHasErrors(true);
            return;
        }

        toggleHasErrors(false);

        const data = {
            customer: {
                name: customerName,
                contact_number: contactNumber,
                employee_name: employeeName,
                doctor_name: doctorName,
                address,
            },
        };

        postEntityData('customers', data)
            .then((res) => {
                if (res.status !== 200) {
                    toggleIsLoading(false);
                    console.log('Show error!');
                    return;
                }

                toggleIsLoading(false);
                router.reload();
                console.log(res.response);
            })
            .catch(console.error);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        toggleHasErrors(false);
        toggleIsLoading(false);
        resetFormFields();
    };

    return (
        <div>
            <Button variant="contained" color="secondary" className={classes.button} onClick={handleClickOpen} startIcon={<AddIcon />} disableElevation>
                Add Customer
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <Toolbar>
                    <Tooltip title="Cancel customer creation">
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>

                    <TextField autoFocus className={classes.nameInputField} type="text" placeholder="Customer name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                    <Tooltip title="Proceed with customer creation">
                        <Button className={classes.submitBtn} variant="contained" color="primary" onClick={handleDataSubmission} disableElevation>
                            {isLoading ? 'Submitting' : 'Submit'}
                        </Button>
                    </Tooltip>
                </Toolbar>

                <List>
                    <ListItem>
                        <TextField fullWidth type="text" label="Address" inputMode="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </ListItem>
                    <div className={classes.spacer}></div>
                    <ListItem>
                        <TextField fullWidth type="number" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                    </ListItem>
                    <div className={classes.spacer}></div>
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel>Doctor</InputLabel>
                            <Select placeholder="Doctor" value={doctorName} onChange={(e) => setDoctorName(e.target.value)}>
                                {doctors &&
                                    doctors.map((doctor, i) => (
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
                            <Select placeholder="Employee" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)}>
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

            <Snackbar TransitionComponent={Grow} open={hasErrors} message="There was an error while submitting the form" key="snackbar" />
        </div>
    );
}
