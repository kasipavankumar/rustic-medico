import React, { FC } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';

interface IOptionsWrapper {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    '& div:not(:first-child)': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const OptionsWrapper: FC<IOptionsWrapper> = (props) => {
  const classes = useStyles();

  return <div className={classes.root}>{props.children}</div>;
};

export default OptionsWrapper;
