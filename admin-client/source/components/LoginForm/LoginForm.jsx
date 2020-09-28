import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

    return (
        <div className={classes.root}>
            {/* <Typography variant="h4">Rustic Medico</Typography> */}
            <Paper variant="outlined" className={classes.paper}>
                <form>
                    <Typography className={classes.title} variant="h5">
                        {formTitle}
                    </Typography>
                    <div className={classes.formBody}>
                        <TextField className={classes.textField} fullWidth type="text" label="Username" variant="standard" />
                        <TextField className={classes.textField} fullWidth type="password" label="Password" variant="standard" />
                    </div>
                    <Button variant="outlined" color="primary">
                        Login
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default LoginForm;
