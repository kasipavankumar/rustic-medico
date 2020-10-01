import { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';

import { LoginService } from '../../services';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(2.2rem - 100vh)',
    height: '100%',
    maxWidth: 400,
    margin: 'auto',
  },
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  formBody: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const LoginForm = ({ formTitle }) => {
  const classes = useStyles();
  const router = useRouter();
  const [adminDetails, setAdminDetails] = useState({ username: '', password: '' });

  const handleLoginProcess = useCallback(() => {
    const data = {
      admin: adminDetails,
    };

    const loginService = new LoginService(data);

    loginService
      .login()
      .then((response) => {
        if (response) {
          router.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [adminDetails]);

  const handleInputs = (e) => {
    e.persist();

    setAdminDetails({
      ...adminDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.paper}>
        <form>
          <Typography className={classes.title} variant="h5">
            {formTitle}
          </Typography>
          <div className={classes.formBody}>
            <TextField autoFocus className={classes.textField} fullWidth type="text" label="Username" variant="standard" name="username" value={adminDetails.username} onChange={handleInputs} />
            <TextField className={classes.textField} fullWidth type="password" label="Password" variant="standard" name="password" value={adminDetails.password} onChange={handleInputs} />
          </div>
          <Button variant="contained" color="primary" disableElevation onClick={handleLoginProcess}>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginForm;
