import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Grow from '@material-ui/core/Grow';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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

export default function EmployeeCreationDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="secondary" className={classes.button} onClick={handleClickOpen} startIcon={<AddIcon />} disableElevation>
                Add Employee
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <Toolbar>
                    <Tooltip title="Cancel employee creation">
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>

                    <TextField autoFocus className={classes.nameInputField} type="text" placeholder="Employee name" />
                    <Tooltip title="Proceed with employee creation">
                        <Button className={classes.submitBtn} variant="contained" color="primary" onClick={handleClose} disableElevation>
                            Submit
                        </Button>
                    </Tooltip>
                </Toolbar>

                <List>
                    <ListItem>
                        <TextField fullWidth type="text" label="Address" inputMode="text" />
                    </ListItem>
                    <div className={classes.spacer}></div>
                    <ListItem>
                        <TextField fullWidth type="number" placeholder="Contact Number" />
                    </ListItem>
                    <div className={classes.spacer}></div>
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel>Shift</InputLabel>
                            <Select placeholder="Shift">
                                <MenuItem value={'Morning'}>Morning</MenuItem>
                                <MenuItem value={'Afternoon'}>Afternoon</MenuItem>
                                <MenuItem value={'Night'}>Night</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}
