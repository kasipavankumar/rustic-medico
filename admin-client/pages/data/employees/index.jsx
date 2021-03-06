import { useState } from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import { useRouter } from 'next/router';

import { Layout, SEO } from '../../../source/components';
import EmployeeCreationForm from '../../../source/components/EntityCreationDialogs/Employees';
import fetchEntities from '../../../source/utils/fetchEntities';
import UpdationForm from '../../../source/components/EntityUpdationDialogs/Employees';
import DeletionForm from '../../../source/components/EntityDeletionForm';
import OptionsWrapper from '../../../source/components/core/Options';

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
    // height: '550px',
    height: '70vh',
    width: '100%',
  },
}));

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'contact_number', headerName: 'Contact Number', width: 150 },
  { field: 'address', headerName: 'Address', width: 300 },
  { field: 'date_of_joining', headerName: 'Date of Joining', width: 150 },
  { field: 'shift', headerName: 'Shift', width: 200 },
  { field: 'created_at', headerName: 'Created At', width: 150 },
  { field: 'updated_at', headerName: 'Updated At', width: 150 },
];

const AllEmployees = ({ employees, errors }) => {
  const classes = useStyles();
  const router = useRouter();

  const [showOptions, toggleShowOptions] = useState(false);
  const [editData, setEditData] = useState({});

  const parseDate = (date) => new Date(date).toDateString();

  const rows = employees.map((employee, i) => {
    const { id, name, contact_number, address, date_of_joining, shift, created_at, updated_at } = employee;

    return {
      id,
      name,
      contact_number,
      address,
      date_of_joining: parseDate(date_of_joining),
      shift,
      created_at: parseDate(created_at),
      updated_at: parseDate(updated_at),
    };
  });

  if (errors) {
    return (
      <Layout path="Employees">
        <SEO title="Employees" faviconEmoji="👨‍💼" />
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

  if (!employees.length) {
    return (
      <Layout path="Employees">
        <SEO title="Employees" faviconEmoji="👨‍💼" />
        <EmployeeCreationForm />
        <div className={classes.noDataRoot}>
          <Typography className={classes.noDataTitle} variant="h4" component="h4">
            No employees yet! <br />
            <Typography className={classes.noDataSubtitle} variant="body1">
              Be kind, hire few employees and come back.
            </Typography>
          </Typography>
        </div>
      </Layout>
    );
  }

  return (
    <Layout path="Employees">
      <SEO title="Employees" faviconEmoji="👨‍💼" />

      <OptionsWrapper>
        <EmployeeCreationForm />
        {showOptions && (
          <>
            <UpdationForm dataToUpdate={editData} />
            <DeletionForm entityName="employees" dataToDelete={editData} />
          </>
        )}
      </OptionsWrapper>

      <div className={classes.dataGridRoot}>
        <DataGrid
          loading={!Boolean(rows.length)}
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
};

export async function getServerSideProps({ req, res }) {
  // Redirect to login if not authenticated.
  if (!req?.headers?.cookie) {
    res.writeHead(307, { Location: '/login' });
    res.end();
    return { props: {} };
  }

  const { entityData, hasErrors, errors } = await fetchEntities('employees');

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
      employees: entityData['employees'],
      errors: hasErrors ? errors : null,
    },
  };
}

export default AllEmployees;
