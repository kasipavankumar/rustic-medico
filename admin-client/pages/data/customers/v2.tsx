import React, { FC } from 'react';

import SEO from 'components/SEO';
import Layout from 'components/Layout';
import DataShell from 'components/DataPageShell';

import request from 'common/api/request';
import parseDate from 'utils/parseDate';

interface ICustomersProps {
  customers: any[];
  hasErrors: boolean;
}

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

const CustomersV2: FC<ICustomersProps> = ({ customers, hasErrors }) => {
  const rows =
    customers &&
    customers.map((customer) => {
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

  return (
    <Layout path="Customers">
      <SEO title="Customers" faviconEmoji="🙋‍♂️" />
      <DataShell
        entityName="customers"
        errors={{ hasErrors }}
        data={{ hasData: !hasErrors, rows, columns }}
      />
    </Layout>
  );
};

export async function getServerSideProps() {
  const { data } = await request({ entity: 'customers' });

  return {
    props: {
      hasErrors: !data,
      customers: data['customers'],
    },
  };
}

export default CustomersV2;
