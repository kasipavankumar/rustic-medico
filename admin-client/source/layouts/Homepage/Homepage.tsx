import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { faviconEmojis, capitalizeFirstLetter } from 'utils/index';

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

const suffixLink = (link: string, s: string) => `${link}/${s}`;

const entityPageLinks = Object.keys(faviconEmojis).map((e) => (
  <Grid item xs={12} sm={6} key={e}>
    <MaterialCard
      title={`${faviconEmojis[e]} ${capitalizeFirstLetter(e)}`}
      description={`View and manage all ${e}`}
      link={suffixLink(`/data/${e}`, 'v2')}
    />
  </Grid>
));

export default function Homepage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        {entityPageLinks}
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
