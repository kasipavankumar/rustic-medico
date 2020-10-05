import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header';

const styles = makeStyles(() => ({
  container: {
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    height: '100%',
    margin: '1.1rem',
  },
}));

const Layout = ({ children, path }) => {
  const classes = styles();

  return (
    <>
      <Header path={path} />
      <div className={classes.container}>{children}</div>
    </>
  );
};

export default Layout;
