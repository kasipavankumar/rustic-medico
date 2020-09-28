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

export default function DrugCreationDialog() {
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
                Add Drug
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <Toolbar>
                    <Tooltip title="Cancel drug creation">
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>

                    <TextField autoFocus className={classes.nameInputField} type="text" placeholder="Drug name" />
                    <Tooltip title="Proceed with drug creation">
                        <Button className={classes.submitBtn} variant="contained" color="primary" onClick={handleClose} disableElevation>
                            Submit
                        </Button>
                    </Tooltip>
                </Toolbar>

                <List>
                    <ListItem>
                        <TextField fullWidth type="number" label="Drug Price" inputMode="numeric" InputProps={{ inputProps: { min: 1 } }} />
                    </ListItem>
                    <div className={classes.spacer}></div>
                    <ListItem>
                        <TextField fullWidth type="date" placeholder="Expiry Date" />
                    </ListItem>
                    <div className={classes.spacer}></div>
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel>Manufacturer</InputLabel>
                            <Select placeholder="Manufacturers" labelId="demo-simple-select-helper-label">
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <div className={classes.spacer}></div>
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel>Supplier</InputLabel>
                            <Select fullWidth placeholder="Suppliers" labelId="demo-simple-select-helper-label">
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <div className={classes.spacer}></div>
                </List>
            </Dialog>
        </div>
    );
}
