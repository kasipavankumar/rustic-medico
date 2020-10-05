import React, { FC } from 'react';

import SEO from 'components/SEO';
import Layout from 'components/Layout';
import DataShell from 'components/DataPageShell';

import parseDate from 'utils/parseDate';
import fetchEntities from 'utils/fetchEntities';

interface ISuppliersProps {
  suppliers: any[];
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

const SuppliersV2: FC<ISuppliersProps> = ({ suppliers, hasErrors }) => {
  const rows =
    suppliers &&
    suppliers.map((supplier) => {
      const {
        id,
        name,
        address,
        contact_number,
        created_at,
        updated_at,
      } = supplier;

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
    <Layout path="Suppliers">
      <SEO title="Suppliers" faviconEmoji="🚚" />
      <DataShell
        entityName="suppliers"
        errors={{ hasErrors }}
        data={{ hasData: !hasErrors, rows, columns }}
      />
    </Layout>
  );
};

export async function getServerSideProps() {
  const { hasErrors, entityData } = await fetchEntities('suppliers');

  if (hasErrors) {
    return {
      props: {
        hasErrors: true,
      },
    };
  }

  return {
    props: {
      suppliers: entityData['suppliers'],
    },
  };
}

export default SuppliersV2;
