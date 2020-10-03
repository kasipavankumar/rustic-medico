import React, { FC } from 'react';
import { Tooltip } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';

interface ICreationFabProps {
  tooltipMessage?: string;
  onClick: () => void;
}

const CreationFab: FC<ICreationFabProps> = ({ onClick, tooltipMessage }) => (
  <div style={{ margin: '0 0 20px 0' }}>
    <Tooltip title={tooltipMessage}>
      <Fab color="secondary" size="medium" onClick={onClick} disableFocusRipple>
        <Add />
      </Fab>
    </Tooltip>
  </div>
);

export default CreationFab;
