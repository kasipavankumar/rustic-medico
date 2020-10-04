import React, { FC } from 'react';
import { Tooltip } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

interface IActionFabProps {
  tooltipMessage?: string;
  onClick: () => void;
  IconComponent: React.ReactNode;
}

const ActionFab: FC<IActionFabProps> = ({ onClick, tooltipMessage, IconComponent }) => (
  <div className="action-button">
    <Tooltip title={tooltipMessage}>
      <Fab color="secondary" size="medium" onClick={onClick} disableFocusRipple>
        {IconComponent}
      </Fab>
    </Tooltip>
  </div>
);

export default ActionFab;
