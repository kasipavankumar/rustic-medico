import React, { FC } from 'react';

import SEO from 'components/SEO';
import Layout from 'components/Layout';
import DataShell from 'components/DataPageShell';

import { parseDate } from 'utils/index';
import fetchEntities from 'utils/fetchEntities';

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

const ManufacturersV2: FC<IManufacturersProps> = ({
  manufacturers,
  hasErrors,
}) => {
  const rows =
    manufacturers &&
    manufacturers.map((manufacturer) => {
      const {
        id,
        name,
        address,
        contact_number,
        created_at,
        updated_at,
      } = manufacturer;

      return {
        id,
        name,
        address,
        contact_number,
        created_at: parseDate(created_at),
        updated_at: parseDate(updated_at),
      };
    });

  return (
    <>
      <Layout path="Manufacturers">
        <SEO title="Manufacturers" faviconEmoji="🏭" />
        <DataShell
          entityName="manufacturers"
          errors={{ hasErrors }}
          data={{ hasData: !hasErrors, rows, columns }}
        />
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const { hasErrors, entityData } = await fetchEntities('manufacturers');

  if (hasErrors) {
    return {
      props: {
        hasErrors: true,
      },
    };
  }

  return {
    props: {
      manufacturers: entityData['drug_manufacturers'],
    },
  };
}

export default ManufacturersV2;
