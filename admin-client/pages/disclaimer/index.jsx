import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { Layout, SEO } from '../../source/components';

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
    container: {
        marginTop: '10%',
        textAlign: 'center',
    },
    title: {
        fontSize: '32px',
        marginBottom: 20,
    },
    hr: {
        maxWidth: '200px',
        margin: '20px auto',
    },
});

export default function Disclaimer() {
    const classes = useStyles();

    return (
        <Layout>
            <SEO title="Disclaimer" faviconEmoji="🎈" />
            <div className={classes.root}>
                <div className={classes.container}>
                    <Typography className={classes.title} variant="h3">
                        🎈 Disclaimer
                    </Typography>
                    <Typography variant="subtitle1">
                        This is a purely project based web application. <br />
                        All the data hence collected, is just for educational purposes and is guranteed not to be misused.
                    </Typography>
                    <hr className={classes.hr} />
                    <Typography variant="body1">
                        Full source code of this web application is available on{' '}
                        <Tooltip title="The repository will go live in few days.">
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/kasipavankumar/rustic-medico">
                                GitHub
                            </a>
                        </Tooltip>
                        .
                    </Typography>
                    <Typography variant="subtitle1">
                        If you have any issues / queries regarding any entity of this website,{' '}
                        <Tooltip title="The repository will go live in few days.">
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/kasipavankumar/rustic-medico/issues">
                                please file an issue over here
                            </a>
                        </Tooltip>
                        .
                    </Typography>
                </div>
            </div>
        </Layout>
    );
}
