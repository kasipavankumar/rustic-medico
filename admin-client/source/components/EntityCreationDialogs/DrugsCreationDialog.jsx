import React, { useCallback, useEffect, useState } from 'react';
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
import Fab from '@material-ui/core/Fab'
import { fetchEntities } from '../../utils';
import Axios from 'axios';
import { ADMIN_KEY, API_URL } from '../../config';
import { useRouter } from 'next/router';

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
  const initialDrugState = {
    name: '',
    price: 1,
    manufacturing_date: '',
    expiry_date: '',
    medical_description: '',
    image_link: '',
    manufacturer_name: '',
    supplier_name: '',
  };

  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [manufacturers, setManufacturers] = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const [drug, setDrug] = useState(initialDrugState);

  useEffect(() => {
    Promise.all([fetchEntities('manufacturers'), fetchEntities('suppliers')])
      .then((data) => {
        const [manufacturers, suppliers] = data;
        setManufacturers(manufacturers.entityData['drug_manufacturers']);
        setSuppliers(suppliers.entityData['suppliers']);
      })
      .catch(console.error);
  }, []);

  const handleDrugCreation = useCallback(() => {
    Axios({
      method: 'POST',
      url: `${API_URL}/api/admin/drugs/add/one`,
      headers: {
        'Content-Type': 'application/json',
        'Admin-Key': ADMIN_KEY,
      },
      data: { drug },
    })
      .then((res) => {
        if (res.status !== 200) {
          console.log('Cannot add drug.');
          return;
        }

        handleClose();
        router.replace('/data/drugs');
        console.log('added drug!');
      })
      .catch(console.error);
  }, [drug]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDrug(initialDrugState);
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="contained" color="secondary" className={classes.button} onClick={handleClickOpen} startIcon={<AddIcon />} disableElevation>
        Add Drug
      </Button> */}

      <Tooltip title="Add a new drug">
        <Fab size="medium" onClick={handleClickOpen} color="secondary">
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog fullScreen open={open} onClose={handleClose}>
        <Toolbar>
          <Tooltip title="Cancel drug creation">
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Tooltip>

          <TextField
            autoFocus
            className={classes.nameInputField}
            type="text"
            placeholder="Drug name"
            onChange={(e) => {
              setDrug({
                ...drug,
                name: e.target.value,
              });
            }}
          />
          <Tooltip title="Proceed with drug creation">
            <Button className={classes.submitBtn} variant="contained" color="primary" onClick={handleDrugCreation} disableElevation>
              Submit
            </Button>
          </Tooltip>
        </Toolbar>

        <List>
          <ListItem>
            <TextField
              fullWidth
              value={drug.price}
              type="number"
              label="Drug Price"
              inputMode="numeric"
              InputProps={{ inputProps: { min: 1 } }}
              onChange={(e) => {
                setDrug({
                  ...drug,
                  price: e.target.value,
                });
              }}
            />
          </ListItem>
          <div className={classes.spacer}></div>
          <ListItem>
            <TextField
              defaultValue="2020-09-30"
              fullWidth
              type="date"
              value={drug.manufacturing_date}
              label="Manufacturing Date"
              placeholder="Manufacturing Date"
              onChange={(e) => {
                setDrug({
                  ...drug,
                  manufacturing_date: e.target.value,
                });
              }}
            />
          </ListItem>
          <div className={classes.spacer}></div>
          <ListItem>
            <TextField
              fullWidth
              value={drug.expiry_date}
              type="date"
              label="Expiry Date"
              placeholder="Expiry Date"
              onChange={(e) => {
                setDrug({
                  ...drug,
                  expiry_date: e.target.value,
                });
              }}
            />
          </ListItem>
          <div className={classes.spacer}></div>
          <ListItem>
            <TextField
              multiline
              fullWidth
              value={drug.medical_description}
              label="Medical Description"
              type="text"
              placeholder="Medical Description"
              onChange={(e) => {
                setDrug({
                  ...drug,
                  medical_description: e.target.value,
                });
              }}
            />
          </ListItem>
          <div className={classes.spacer}></div>
          <ListItem>
            <TextField
              fullWidth
              inputMode="url"
              type="url"
              placeholder="Image URL"
              onChange={(e) => {
                setDrug({
                  ...drug,
                  image_link: e.target.value,
                });
              }}
            />
          </ListItem>
          <div className={classes.spacer}></div>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Manufacturer</InputLabel>
              <Select
                placeholder="Manufacturers"
                value={drug.manufacturer_name}
                onChange={(e) => {
                  setDrug({
                    ...drug,
                    manufacturer_name: e.target.value,
                  });
                }}
              >
                {manufacturers &&
                  manufacturers.map((manufacturer) => (
                    <MenuItem key={manufacturer.id} value={manufacturer.name}>
                      {manufacturer.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </ListItem>
          <div className={classes.spacer}></div>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Supplier</InputLabel>
              <Select
                fullWidth
                value={drug.supplier_name}
                placeholder="Suppliers"
                onChange={(e) => {
                  setDrug({
                    ...drug,
                    supplier_name: e.target.value,
                  });
                }}
              >
                {suppliers &&
                  suppliers.map((supplier) => (
                    <MenuItem key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </ListItem>
          <div className={classes.spacer}></div>
        </List>
      </Dialog>
    </div>
  );
}
