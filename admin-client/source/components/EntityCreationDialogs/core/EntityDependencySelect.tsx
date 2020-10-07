import React, { FC } from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';

import { FormControl } from './DialogBase';
import { IEntityDependentsSelectionProps } from './types';
import useEntityData from 'hooks/useEntityData';

const EntityDenpendencySelect: FC<IEntityDependentsSelectionProps> = ({
  entityName,
  label,
  name,
  value,
  variant,
  onChange,
}) => {
  const { hasErrors, isLoading, entityData } = useEntityData(entityName);

  if (hasErrors || isLoading) {
    return <></>;
  }

  return (
    <>
      <FormControl variant={variant} fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select name={name} value={value} onChange={onChange}>
          {entityData.map((e) => (
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
