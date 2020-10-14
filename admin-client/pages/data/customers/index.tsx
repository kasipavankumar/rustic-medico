/**
 * TODO: Find a way to adjust columns dynamically according to data from API.
 */

import React, { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DataGrid, RowData } from '@material-ui/data-grid';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import EntityCreationDialog from 'components/EntityCreationDialogs/Customers';
import CustomerUpdateForm from 'components/EntityUpdationDialogs/Customers';
import CustomerDeleteForm from 'components/EntityDeletionForm';
import OptionsWrapper from 'components/core/Options';
import request from 'common/api/request';

interface ICustomersData {
  id: string;
  name: string;
  address: string;
  last_purchased_on: string;
  contact_number: string;
  employee_name: string;
  doctor_name: string;
  created_at: string;
  updated_at: string;
}

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
    fontSize: 28,
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
    maxHeight: '70vh',
    width: '100%',
  },
  optionsRoot: {
    display: 'flex',
    alignItems: 'center',
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!req?.headers?.cookie) {
    res.writeHead(307, { Location: '/login' });
    res.end();
    return { props: {} };
  }

  const { data } = await request({ entity: 'customers' });

  return {
    props: {
      errors: !data,
      customers: data ? data['customers'] : [],
    },
  };
};

const Customers = ({
  customers,
  errors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();

  const [showOptions, toggleShowOptions] = useState(false);
  const [editData, setEditData] = useState<ICustomersData>({
    id: '',
    name: '',
    address: '',
    last_purchased_on: '',
    contact_number: '',
    employee_name: '',
    doctor_name: '',
    created_at: '',
    updated_at: '',
  });

  const parseDate = (date: string) => new Date(date).toDateString();

  const rows: ICustomersData[] =
    customers &&
    customers.map((customer: ICustomersData) => {
      const {
        id,
        name,
        address,
        last_purchased_on,
        contact_number,
        employee_name,
        doctor_name,
        created_at,
        updated_at,
      } = customer;

      return {
        id,
        name,
        address,
        last_purchased_on: parseDate(last_purchased_on),
        contact_number,
        employee_name: employee_name || '-',
        doctor_name: doctor_name || '-',
        created_at: parseDate(created_at),
        updated_at: parseDate(updated_at),
      };
    });

  if (errors) {
    return (
      <Layout path="Customers">
        <SEO title="Customers" faviconEmoji="🙋‍♂️" />
        <div className={classes.errorRoot}>
          <Typography
            color="error"
            className={classes.errorTitle}
            variant="h2"
            component="h2"
          >
            Something went wrong!
          </Typography>
        </div>
      </Layout>
    );
  }

  if (!customers.length) {
    return (
      <Layout path="Customers">
        <SEO title="Customers" faviconEmoji="🙋‍♂️" />
        <EntityCreationDialog />
        <div className={classes.noDataRoot}>
          <Typography
            className={classes.noDataTitle}
            variant="h4"
            component="h4"
          >
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

      <OptionsWrapper>
        <EntityCreationDialog />
        {showOptions && (
          <>
            <CustomerUpdateForm dataToUpdate={editData} />
            <CustomerDeleteForm
              entityName="customers"
              dataToDelete={editData}
            />
          </>
        )}
      </OptionsWrapper>

      <div className={classes.dataGridRoot}>
        <DataGrid
          loading={!rows.length}
          rows={rows as RowData[]}
          columns={columns}
          pageSize={10}
          onCellClick={(e) => {
            setEditData(e.data as ICustomersData);
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

export default Customers;
