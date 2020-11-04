import { makeStyles } from '@material-ui/core/styles';

export const usePageStyles = makeStyles((theme) => ({
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
    // height: '550px',
    height: '70vh',
    maxHeight: '70vh',
    width: '100%',
  },
  optionsRoot: {
    display: 'flex',
    alignItems: 'center',
  },
}));
