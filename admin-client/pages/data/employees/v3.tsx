import React, { FC, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import SEO from 'components/SEO';
import Layout from 'components/Layout';
import DataShell from 'components/DataPageShell';

import { parseDate } from 'utils/index';
import fetchEntities from 'utils/fetchEntities';

interface IEmployeesProps {
  employees: any[];
  hasErrors: boolean;
}

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'contact_number', headerName: 'Contact Number', width: 150 },
  { field: 'address', headerName: 'Address', width: 300 },
  { field: 'date_of_joining', headerName: 'Date of Joining', width: 200 },
  { field: 'shift', headerName: 'Shift', width: 100 },
  { field: 'created_at', headerName: 'Created At', width: 200 },
  { field: 'updated_at', headerName: 'Updated At', width: 210 },
];

const EmployeesV3: FC<IEmployeesProps> = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const { entityData } = await fetchEntities('employees');
      setEmployees(entityData['employees']);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const rows =
    employees &&
    employees.map((employee) => {
      const {
        id,
        name,
        contact_number,
        address,
        date_of_joining,
        shift,
        created_at,
        updated_at,
      } = employee;

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

  const body = !employees.length ? (
    <>
      <Typography variant="h2">Loading...</Typography>
      <CircularProgress color="primary" />
    </>
  ) : (
    <DataShell
      entityName="employees"
      errors={{ hasErrors: !employees || !employees.length }}
      data={{
        hasData: !!employees.length,
        rows,
        columns,
      }}
    />
  );

  return (
    <>
      <Layout path="Employees">
        <SEO title="Employees" faviconEmoji="👨‍💼" />
        {body}
      </Layout>
    </>
  );
};

export default EmployeesV3;
