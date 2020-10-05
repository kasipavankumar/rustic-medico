import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  fullScreenContainer: {
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
  },
  errorMessageTitle: {
    fontSize: 26,
    marginTop: '25vh',
  },
  errorMessageSubtitle: {
    marginTop: 10,
  },
  dataGridContainer: {
    height: '70vh',
    width: '100%',
  },
}));
