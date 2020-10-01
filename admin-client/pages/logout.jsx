import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { TokenService } from '../source/services';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    placeItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: '24px',
    marginTop: '50vh',
  },
});

export default function Logout() {
  const router = useRouter();
  const styles = useStyles();

  useEffect(() => {
    TokenService.removeCookie('_SID_');
    router.push('/login');
  }, []);

  return (
    <div className={styles.root}>
      <Typography variant="h3" className={styles.title}>
        Logging out...
      </Typography>
    </div>
  );
}
