import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Layout, SEO } from '../../source/components';
import { CustomersCreationDialog } from '../../source/components/EntityCreationDialogs';
import { fetchEntities } from '../../source/utils';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    button: {
        marginBottom: theme.spacing(2),
    },
    errorRoot: {
        height: '100%',
        textAlign: 'center',
    },
    errorTitle: {
        fontSize: 26,
        marginTop: '30vh',
    },
    errorSubtitle: {
        marginTop: 10,
    },
    noDataRoot: {
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
    },
    noDataTitle: {
        fontSize: 26,
        marginTop: '25vh',
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
                <SEO title="Customers" faviconEmoji="🙋‍♂️" />
                <div className={classes.errorRoot}>
                    <Typography color="error" className={classes.errorTitle} variant="h2" component="h2">
                        Something went wrong!
                        <Typography color="error" className={classes.errorSubtitle} variant="body1">
                            500
                        </Typography>
                    </Typography>
                </div>
            </Layout>
        );
    }

    if (!customers.length) {
        return (
            <Layout path="Customers">
                <SEO title="Customers" faviconEmoji="🙋‍♂️" />
                <CustomersCreationDialog />
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
            <SEO title="Customers" faviconEmoji="🙋‍♂️" />

            <CustomersCreationDialog />

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
            customers: entityData['customers'],
            errors: hasErrors ? errors : null,
        },
    };
}
