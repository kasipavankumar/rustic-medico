import React, { FC } from 'react';
import V3PageShell from 'components/v3PageShell';

interface IEmployeesProps {
  employees: any[];
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

const EmployeesV3: FC<IEmployeesProps> = () => {
  return (
    <>
      <V3PageShell entityName="customers" columns={columns} />
    </>
  );
};

export default EmployeesV3;
