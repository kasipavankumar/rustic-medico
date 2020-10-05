import React, { FC } from 'react';
import { Tooltip } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

interface IActionFabProps {
  /**
   * Enable / Disable tooltip.
   */
  tooltip?: boolean;
  /**
   * If tooltip is enabled, message to display.
   */
  tooltipMessage?: string;
  /**
   * Material Icon to embed in Fab.
   */
  IconComponent: React.ReactNode;
  /**
   * Callback fired when Fab is clicked.
   */
  onClick: () => void;
}

const ActionFab: FC<IActionFabProps> = ({
  onClick,
  tooltipMessage,
  IconComponent,
}) => (
  <div className="action-button">
    <Tooltip id="action-tooltip" title={tooltipMessage}>
      <Fab id="action-fab" color="secondary" size="medium" onClick={onClick} disableFocusRipple>
        {IconComponent}
      </Fab>
    </Tooltip>
  </div>
);

export default ActionFab;
