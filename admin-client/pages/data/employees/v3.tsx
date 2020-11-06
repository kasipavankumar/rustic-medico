import React, { FC } from 'react';
import V3PageShell from 'components/v3PageShell';

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
  return (
    <>
      <V3PageShell entityName="employees" columns={columns} />
    </>
  );
};

export default EmployeesV3;
