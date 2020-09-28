import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Layout, SEO } from '../../source/components';
import { fetchEntities } from '../../source/utils';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    button: {
        marginBottom: theme.spacing(2),
    },
    noDataRoot: {
        height: 'calc(-7.1em + 100vh)',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
    },
    noDataTitle: {
        fontSize: 26,
    },
    noDataSubtitle: {
        marginTop: 10,
    },
}));

export default function Customers({ customers, errors }) {
    const classes = useStyles();

    if (errors) {
        return (
            <Layout path="Customers">
                <Typography variant="h1" component="h1">
                    Something went wrong!
                </Typography>
            </Layout>
        );
    }

    if (!customers.length) {
        return (
            <Layout path="Customers">
                <div className={classes.noDataRoot}>
                    <Typography className={classes.noDataTitle} variant="h4" component="h4">
                        No customers yet! <br />
                        <Typography className={classes.noDataSubtitle} variant="body1">
                            Go spread some word and attract customers.
                        </Typography>
                    </Typography>
                </div>
            </Layout>
        );
    }

    return (
        <Layout path="Customers">
            <SEO title="Customers" />

            <Link href="/drug/add">
                <Button variant="contained" color="secondary" className={classes.button} startIcon={<AddIcon />}>
                    Add Customer
                </Button>
            </Link>

            <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} aria-label="Drugs data table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Contact Number</TableCell>
                            <TableCell>Employee</TableCell>
                            <TableCell>Doctor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow id={customer.id} key={customer.id}>
                                <TableCell component="th" scope="row">
                                    {customer.name}
                                </TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>{customer.contact_number}</TableCell>
                                <TableCell>{customer.employee_name}</TableCell>
                                <TableCell>{customer.doctor_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    );
}

export async function getServerSideProps() {
    const { entityData, hasErrors, errors } = await fetchEntities('customers');

    return {
        props: {
            customers: entityData,
            errors: hasErrors ? errors : null,
        },
    };
}
