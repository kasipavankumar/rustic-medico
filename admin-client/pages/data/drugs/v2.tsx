import React, { FC } from 'react';

import SEO from 'components/SEO';
import Layout from 'components/Layout';
import DataShell from 'components/DataPageShell';

import parseDate from 'utils/parseDate';
import fetchEntities from 'utils/fetchEntities';

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

const DrugsV2: FC<IDrugsProps> = ({ drugs, hasErrors }) => {
  const rows = drugs.map((drug) => {
    const {
      id,
      name,
      price,
      medical_description,
      manufacturing_date,
      image_link,
      expiry_date,
      manufacturer_name,
      supplier_name,
      created_at,
      updated_at,
    } = drug;

    return {
      id,
      name,
      price,
      image_link,
      medical_description,
      manufacturing_date: parseDate(manufacturing_date),
      expiry_date: parseDate(expiry_date),
      manufacturer_name: manufacturer_name || '-',
      supplier_name: supplier_name || '-',
      created_at: parseDate(created_at),
      updated_at: parseDate(updated_at),
    };
  });

  return (
    <>
      <Layout path="Drugs">
        <SEO title="Drugs" faviconEmoji="💊" />
        <DataShell
          entityName="drugs"
          errors={{ hasErrors }}
          data={{ hasData: !hasErrors, rows, columns }}
        />
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const { hasErrors, entityData } = await fetchEntities('drugs');

  if (hasErrors) {
    return {
      props: {
        hasErrors: true,
      },
    };
  }

  return {
    props: {
      drugs: entityData['drugs'],
    },
  };
}

export default DrugsV2;
