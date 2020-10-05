import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';

import { Layout, SEO } from '../../../source/components';
import { fetchEntities } from '../../../source/utils';
import ManufacturerCreationDialog from '../../../source/components/EntityCreationDialogs/Manufacturers';
import ManufacturerUpdateForm from '../../../source/components/EntityUpdationDialogs/Manufacturers';
import ManufacturerDeleteForm from '../../../source/components/EntityDeletionForm';
import OptionsWrapper from '../../../source/components/core/Options';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  errorRoot: {
    height: '100%',
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 28,
    marginTop: '30vh',
  },
  errorSubtitle: {
    marginTop: 10,
  },
  noDataRoot: {
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
  },
  noDataTitle: {
    fontSize: 26,
    marginTop: '25vh',
  },
  noDataSubtitle: {
    marginTop: 10,
  },
  dataGridRoot: {
    height: '70vh',
    maxHeight: '70vh',
    width: '100%',
  },
  optionsRoot: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'address', headerName: 'Address', type: 'text', width: 500 },
  { field: 'contact_number', headerName: 'Contact Number', width: 150 },
  { field: 'created_at', headerName: 'Created At', width: 150 },
  { field: 'updated_at', headerName: 'Updated At', width: 150 },
];

const Manufacturers = ({ manufacturers, errors }) => {
  const classes = useStyles();

  const [showOptions, toggleShowOptions] = useState(false);
  const [editData, setEditData] = useState({});

  if (errors) {
    return (
      <Layout path="Manufacturers">
        <SEO title="Manufacturers" faviconEmoji="🙋‍♂️" />
        <div className={classes.errorRoot}>
          <Typography color="error" className={classes.errorTitle} variant="h2" component="h2">
            Something went wrong!
          </Typography>
        </div>
      </Layout>
    );
  }

  const parseDate = (date) => new Date(date).toDateString();

  const rows =
    manufacturers &&
    manufacturers.map((manufacturer) => {
      const { id, name, address, contact_number, created_at, updated_at } = manufacturer;

      return {
        id,
        name,
        address,
        contact_number,
        created_at: parseDate(created_at),
        updated_at: parseDate(updated_at),
      };
    });

  if (!manufacturers.length) {
    return (
      <Layout path="Manufacturers">
        <SEO title="Manufacturers" faviconEmoji="🙋‍♂️" />
        <ManufacturerCreationDialog />
        <div className={classes.noDataRoot}>
          <Typography className={classes.noDataTitle} variant="h4" component="h4">
            No manufacturers yet! <br />
            <Typography className={classes.noDataSubtitle} variant="body1">
              Have a strong coffee with few manufacturers to have them supply you things.
            </Typography>
          </Typography>
        </div>
      </Layout>
    );
  }

  return (
    <Layout path="Manufacturers">
      <SEO title="Manufacturers" faviconEmoji="🙋‍♂️" />

      <OptionsWrapper>
        <ManufacturerCreationDialog />
        {showOptions && (
          <>
            <ManufacturerUpdateForm dataToUpdate={editData} />
            <ManufacturerDeleteForm entityName="manufacturers" dataToDelete={editData} />
          </>
        )}
      </OptionsWrapper>

      <div className={classes.dataGridRoot}>
        <DataGrid
          loading={!rows.length}
          rows={rows}
          columns={columns}
          pageSize={10}
          onCellClick={(e) => {
            setEditData(e.data);
            if (editData.name === e.data.name) {
              toggleShowOptions(!showOptions);
            } else {
              toggleShowOptions(true);
            }
          }}
        />
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  // Redirect to login if not authenticated.
  if (!req?.headers?.cookie) {
    res.writeHead(307, { Location: '/login' });
    res.end();
    return { props: {} };
  }

  const { hasErrors, entityData } = await fetchEntities('manufacturers');

  if (hasErrors) {
    return {
      props: {
        errors: true,
      },
    };
  }

  return {
    props: {
      manufacturers: entityData['drug_manufacturers'],
    },
  };
}

export default Manufacturers;
