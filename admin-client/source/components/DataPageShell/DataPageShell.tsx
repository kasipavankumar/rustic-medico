/**
 * Shell component for all the data pages.
 */

import React, { FC, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';

import OptionsContainer from 'components/core/Options';
import EntityDeletionForm from 'components/EntityDeletionForm';

import { useStyles } from './DataPageShell.styles';
import { IDataPageShellProps } from './DataPageShell.types';
import {
  LoadEntityCreationForm,
  LoadEntityUpdationForm,
} from './DataPageShell.utils';

const DataPageShell: FC<IDataPageShellProps> = ({
  entityName,
  errors: { hasErrors },
  data: { hasData, rows, columns },
}) => {
  const [showOptions, toggleShowOptions] = useState<boolean>(false);
  const [dataToOperate, setDataToOperate] = useState<any>({});

  const classes = useStyles();

  if (hasErrors) {
    return (
      <div className={classes.fullScreenContainer}>
        <Typography
          color="error"
          className={classes.errorMessageTitle}
          variant="h2"
          component="h2"
        >
          Something went wrong!
        </Typography>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className={classes.fullScreenContainer}>
        <Typography
          className={classes.errorMessageTitle}
          variant="h4"
          component="h4"
        >
          No customers yet! <br />
          <Typography className={classes.errorMessageSubtitle} variant="body1">
            Go spread some word and attract customers.
          </Typography>
        </Typography>
      </div>
    );
  }

  return (
    <>
      <OptionsContainer>
        {LoadEntityCreationForm(entityName)}
        {showOptions && (
          <>
            <EntityDeletionForm
              entityName={entityName}
              dataToDelete={dataToOperate}
            />
            {LoadEntityUpdationForm(entityName, dataToOperate)}
          </>
        )}
      </OptionsContainer>

      <div className={classes.dataGridContainer}>
        <DataGrid
          loading={!rows.length}
          rows={rows}
          columns={columns}
          pageSize={10}
          onCellClick={(e) => {
            setDataToOperate(e.data);
            if (dataToOperate.name === e.data.name) {
              toggleShowOptions(!showOptions);
            } else {
              toggleShowOptions(true);
            }
          }}
        />
      </div>
    </>
  );
};

export default DataPageShell;
