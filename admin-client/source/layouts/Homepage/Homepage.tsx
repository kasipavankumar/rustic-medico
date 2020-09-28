import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

export default function Homepage() {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs>
                    <MaterialCard title="👨‍💼 Employees" description="View and Manage all Employees" link="/employees" />
                </Grid>
                <Grid item xs>
                    <MaterialCard title="🙋‍♂️ Customers" description="View and Manage all Customers" link="/customers" />
                </Grid>
                <Grid item xs>
                    <MaterialCard title="💊 Drugs" description="View and Manage all Drugs" link="/drugs" />
                </Grid>
            </Grid>
        </>
    );
}

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        minWidth: 275,
        margin: 10,
    },
    title: {
        fontSize: 14,
    },
    description: {
        marginTop: 15,
        marginBottom: 10,
    },
});

function MaterialCard({ description, title, link }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography className={classes.description} color="textSecondary" gutterBottom>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={link}>
                    <Button size="small">Manage 🔧</Button>
                </Link>
            </CardActions>
        </Card>
    );
}