import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import { Layout, SEO } from '../../../source/components';
import { CustomersCreationDialog } from '../../../source/components/EntityCreationDialogs';
import { CustomersUpdationDialog } from '../../../source/components/EntityUpdationDialogs';
import { fetchEntities } from '../../../source/utils';
import { useEffect } from 'react';
import { Tooltip } from '@material-ui/core';

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
    '& button': {
      marginLeft: 10,
      marginBottom: '16px',
    },
  },
}));

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'address', headerName: 'Address', type: 'text', width: 300 },
  { field: 'last_purchased_on', headerName: 'Last Purchase Date', width: 200 },
  { field: 'contact_number', headerName: 'Contact Number', width: 150 },
  { field: 'employee_name', headerName: 'Employee Name', width: 150 },
  { field: 'doctor_name', headerName: 'Doctor Name', width: 200 },
  { field: 'created_at', headerName: 'Created At', width: 150 },
  { field: 'updated_at', headerName: 'Updated At', width: 150 },
];

export default function Customers({ customers, errors }) {
  const classes = useStyles();
  const [showOptions, toggleShowOptions] = useState(false);
  const [editData, setEditData] = useState({});

  const parseDate = (date) => new Date(date).toDateString();

  const rows = customers.map((customer) => {
    const { id, name, address, last_purchased_on, contact_number, employee_name, doctor_name, created_at, updated_at } = customer;

    return {
      id,
      name,
      address,
      last_purchased_on: parseDate(last_purchased_on),
      contact_number,
      employee_name,
      doctor_name,
      created_at: parseDate(created_at),
      updated_at: parseDate(updated_at),
    };
  });

  if (errors) {
    return (
      <Layout path="Customers">
        <SEO title="Customers" faviconEmoji="🙋‍♂️" />
        <div className={classes.errorRoot}>
          <Typography color="error" className={classes.errorTitle} variant="h2" component="h2">
            Something went wrong!
            <Typography color="error" className={classes.errorSubtitle} variant="body1">
              500
            </Typography>
          </Typography>
        </div>
      </Layout>
    );
  }

  if (!customers.length) {
    return (
      <Layout path="Customers">
        <SEO title="Customers" faviconEmoji="🙋‍♂️" />
        <CustomersCreationDialog />
        <div className={classes.noDataRoot}>
          <Typography className={classes.noDataTitle} variant="h4" component="h4">
            No customers yet! <br />
            <Typography className={classes.noDataSubtitle} variant="body1">
              Go spread some word and attract customers.
            </Typography>
          </Typography>
        </div>
      </Layout>
    );
  }

  return (
    <Layout path="Customers">
      <SEO title="Customers" faviconEmoji="🙋‍♂️" />

      <div className={classes.optionsRoot}>
        <CustomersCreationDialog />
        {showOptions && <CustomersUpdationDialog data={editData} />}
      </div>

      <div className={classes.dataGridRoot}>
        <DataGrid
          loading={!rows.length}
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
  const { entityData, hasErrors, errors } = await fetchEntities('customers');

  return {
    props: {
      customers: entityData['customers'],
      errors: hasErrors ? errors : null,
    },
  };
}
