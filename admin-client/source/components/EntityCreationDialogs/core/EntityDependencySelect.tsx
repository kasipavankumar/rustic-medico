import React, { FC, useEffect, useState } from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';

import { FormControl } from './DialogBase';
import { IEntityDependentsSelectionProps } from './types';
import NetworkService from '../../../services/networkService';

const EntityDenpendencySelect: FC<IEntityDependentsSelectionProps> = ({ entityName, label, name, value, variant, onChange }) => {
  const networkService = new NetworkService(entityName);
  const [entityData, setEntityData] = useState<any[] | boolean>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await networkService.fetchData();
        setEntityData(data);
      } catch (err) {
        throw new Error(err);
      }
    };

    fetch();

    return () => {
      setEntityData([]);
    };
  }, []);

  if (!entityData) {
    return <></>;
  }

  return (
    <>
      <FormControl variant={variant} fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select name={name} value={value} onChange={onChange}>
          {Array.isArray(entityData) &&
            entityData.map((e) => (
              <MenuItem key={e.id} value={e.name}>
                {e.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default EntityDenpendencySelect;
