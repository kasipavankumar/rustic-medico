import React, { FC, useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import SEO from 'components/SEO';
import Layout from 'components/Layout';
import DataShell from 'components/DataPageShell';
import { EntityLike } from 'components/core/types';

import fetchEntities from 'utils/fetchEntities';
import { capitalizeFirstLetter, faviconEmojis } from 'utils/index';

interface IV3PageProps {
  entityName: EntityLike;
  columns: any[];
}

const loaderStyles = makeStyles({
  container: {
    display: 'grid',
    placeItems: 'center',
    height: '85vh',
    width: '100%',
    margin: 'auto',
  },
  body: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  message: {
    marginTop: '20px',
    letterSpacing: '0.055em',
  },
});

const V3PageShell: FC<IV3PageProps> = ({ entityName, columns }) => {
  const loaderClasses = loaderStyles();
  const [entityData, setEntityData] = useState([]);
  const capitalizedEntityName = capitalizeFirstLetter(entityName);

  const fetchEntityData = async () => {
    try {
      const _e =
        entityName === 'manufacturers' ? 'drug_manufacturers' : entityName;
      const res = await fetchEntities(entityName);
      setEntityData(res.entityData[_e]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEntityData();
  }, []);

  const body = !entityData.length ? (
    <div className={loaderClasses.container}>
      <div className={loaderClasses.body}>
        <LinearProgress
          style={{ width: '100%' }}
          variant="indeterminate"
          color="primary"
        />
        <Typography className={loaderClasses.message} variant="h6">
          Loading data...
        </Typography>
      </div>
    </div>
  ) : (
    <DataShell
      entityName={entityName}
      errors={{ hasErrors: !entityData || !entityData.length }}
      data={{
        hasData: !!entityData.length,
        rows: entityData,
        columns,
      }}
    />
  );

  return (
    <>
      <Layout path={capitalizedEntityName}>
        <SEO
          title={capitalizedEntityName}
          faviconEmoji={faviconEmojis[entityName]}
        />
        {body}
      </Layout>
    </>
  );
};

export default V3PageShell;
