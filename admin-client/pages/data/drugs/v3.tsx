import React, { FC } from 'react';
import V3PageShell from 'components/v3PageShell';

interface IDrugsProps {
  drugs: any[];
  hasErrors: boolean;
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70, hide: true },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'price', headerName: 'Price (INR)', type: 'number', width: 150 },
  { field: 'image_link', headerName: 'Image Link', hide: true },
  {
    field: 'medical_description',
    headerName: 'Medical Description',
    width: 350,
  },
  { field: 'manufacturing_date', headerName: 'Manufacturing Date', width: 200 },
  { field: 'expiry_date', headerName: 'Expiry Date', width: 200 },
  { field: 'manufacturer_name', headerName: 'Manufacturer', width: 300 },
  { field: 'supplier_name', headerName: 'Supplier', width: 250 },
  { field: 'created_at', headerName: 'Created At', width: 150 },
  { field: 'updated_at', headerName: 'Updated At', width: 150 },
];

const EmployeesV3: FC<IDrugsProps> = () => {
  return (
    <>
      <V3PageShell entityName="drugs" columns={columns} />
    </>
  );
};

export default EmployeesV3;
