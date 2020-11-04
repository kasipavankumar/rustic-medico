import React, { FC } from 'react';

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
  { field: 'date_of_joining', headerName: 'Date of Joining', width: 150 },
  { field: 'shift', headerName: 'Shift', width: 200 },
  { field: 'created_at', headerName: 'Created At', width: 150 },
  { field: 'updated_at', headerName: 'Updated At', width: 150 },
];

const EmployeesV2: FC<IEmployeesProps> = ({ employees, hasErrors }) => {
  const rows = employees.map((employee) => {
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

  return (
    <>
      <Layout path="Employees">
        <SEO title="Employees" faviconEmoji="👨‍💼" />
        <DataShell
          entityName="employees"
          errors={{ hasErrors }}
          data={{ hasData: !hasErrors, rows, columns }}
        />
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const { hasErrors, entityData } = await fetchEntities('employees');

  if (hasErrors) {
    return {
      props: {
        hasErrors: true,
      },
    };
  }

  return {
    props: {
      employees: entityData['employees'],
    },
  };
}

export default EmployeesV2;
