import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

import { Layout, SEO } from '../../../source/components';
import { DrugsCreationDialog } from '../../../source/components/EntityCreationDialogs';
import { DrugsUpdationDialog } from '../../../source/components/EntityUpdationDialogs';
import { DrugsDeletionDialog } from '../../../source/components/EntityDeletionDialogs';
import fetchEntities from '../../../source/utils/fetchEntities';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  errorRoot: {
    height: '100%',
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 26,
    marginTop: '30vh',
  },
  errorSubtitle: {
    marginTop: 10,
  },
  noDataRoot: {
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
  },
  noDataTitle: {
    fontSize: 26,
    marginTop: '25vh',
  },
  noDataSubtitle: {
    marginTop: 10,
  },
  dataGridRoot: {
    height: '565px',
    width: '100%',
  },
  optionsRoot: {
    display: 'flex',
    alignItems: 'center',
    '& div:first-child': {
      marginBottom: '16px',
    },
    '& div:not(:first-child)': {
      marginLeft: 15,
      marginBottom: '16px',
    },
  },
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 70, hide: true },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'price', headerName: 'Price (INR)', type: 'number', width: 150 },
  { field: 'image_link', headerName: 'Image Link', hide: true },
  { field: 'medical_description', headerName: 'Medical Description', width: 350 },
  { field: 'manufacturing_date', headerName: 'Manufacturing Date', width: 200 },
  { field: 'expiry_date', headerName: 'Expiry Date', width: 200 },
  { field: 'manufacturer_name', headerName: 'Manufacturer', width: 300 },
  { field: 'supplier_name', headerName: 'Supplier', width: 250 },
  { field: 'created_at', headerName: 'Created At', width: 150 },
  { field: 'updated_at', headerName: 'Updated At', width: 150 },
];

export default function Drugs({ drugs, errors }) {
  const classes = useStyles();
  const router = useRouter();

  const [showOptions, toggleShowOptions] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const token = cookie.get('_SID_');

    if (!token) {
      router.replace('/login');
    }
  }, []);

  const parseDate = (date) => new Date(date).toDateString();

  const rows = drugs.map((drug, i) => {
    const { id, name, price, medical_description, manufacturing_date, image_link, expiry_date, manufacturer_name, supplier_name, created_at, updated_at } = drug;

    return {
      id,
      name,
      price,
      image_link,
      medical_description,
      manufacturing_date: parseDate(manufacturing_date),
      expiry_date: parseDate(expiry_date),
      manufacturer_name,
      supplier_name,
      created_at: parseDate(created_at),
      updated_at: parseDate(updated_at),
    };
  });

  if (errors) {
    return (
      <Layout path="Drugs">
        <SEO title="Drugs" faviconEmoji="💊" />
        <div className={classes.errorRoot}>
          <Typography color="error" className={classes.errorTitle} variant="h2" component="h2">
            Something went wrong!
          </Typography>
        </div>
      </Layout>
    );
  }

  if (!drugs.length) {
    return (
      <Layout path="Customers">
        <SEO title="Drugs" faviconEmoji="💊" />
        <DrugsCreationDialog />
        <div className={classes.noDataRoot}>
          <Typography className={classes.noDataTitle} variant="h4" component="h4">
            No drugs yet! <br />
            <Typography className={classes.noDataSubtitle} variant="body1">
              Go ahead and add as many drugs as you want.
            </Typography>
          </Typography>
        </div>
      </Layout>
    );
  }

  return (
    <Layout path="Drugs">
      <SEO title="Drugs" faviconEmoji="💊" />

      <div className={classes.optionsRoot}>
        <DrugsCreationDialog />
        {showOptions && (
          <>
            <DrugsUpdationDialog data={editData} />
            <DrugsDeletionDialog data={editData} />
          </>
        )}
      </div>

      <div className={classes.dataGridRoot}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          onCellClick={(e) => {
            setEditData(e.data);
            if (editData.name === e.data.name) {
              toggleShowOptions(!showOptions);
            } else {
              toggleShowOptions(true);
            }
          }}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { entityData, hasErrors, errors } = await fetchEntities('drugs');

  if (hasErrors) {
    return {
      props: {
        drugs: null,
        errors,
      },
    };
  }

  return {
    props: {
      drugs: entityData['drugs'],
      errors: null,
    },
  };
}
