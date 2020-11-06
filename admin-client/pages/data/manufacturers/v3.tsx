import React, { FC } from 'react';
import V3PageShell from 'components/v3PageShell';

interface IManufacturersProps {
  manufacturers: any[];
  hasErrors: boolean;
}

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'address', headerName: 'Address', type: 'text', width: 500 },
  { field: 'contact_number', headerName: 'Contact Number', width: 150 },
  { field: 'created_at', headerName: 'Created At', width: 150 },
  { field: 'updated_at', headerName: 'Updated At', width: 150 },
];

const EmployeesV3: FC<IManufacturersProps> = () => {
  return (
    <>
      <V3PageShell entityName="manufacturers" columns={columns} />
    </>
  );
};

export default EmployeesV3;
