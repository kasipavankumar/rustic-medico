import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
  },
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
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export default function Homepage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <MaterialCard
            title="👨‍💼 Employees"
            description="View and Manage all Employees"
            link="/data/employees"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MaterialCard
            title="🙋‍♂️ Customers"
            description="View and Manage all Customers"
            link="/data/customers"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MaterialCard
            title="💊 Drugs"
            description="View and Manage all Drugs"
            link="/data/drugs"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MaterialCard
            title="🏭 Manufacturers"
            description="View and Manage Manufacturers"
            link="/data/manufacturers"
          />
        </Grid>
        <Grid item xs>
          <MaterialCard
            title="🚚 Suppliers"
            description="View and Manage all Suppliers"
            link="/data/suppliers"
          />
        </Grid>
      </Grid>
    </div>
  );
}

function MaterialCard({ description, title, link }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography
          className={classes.description}
          color="textSecondary"
          gutterBottom
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={link}>
          <a className={classes.link}>
            <Button size="small">Manage 🔧</Button>
          </a>
        </Link>
      </CardActions>
    </Card>
  );
}
