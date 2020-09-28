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
import { EmployeeCreationDialog } from '../../source/components/EntityCreationDialogs';
import fetchEntities from '../../source/utils/fetchEntities';

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

const AllEmployees = ({ employees, errors }) => {
    const classes = useStyles();

    if (errors) {
        return (
            <Layout path="Employees">
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

    if (!employees.length) {
        return (
            <Layout path="Employees">
                <EmployeeCreationDialog />
                <div className={classes.noDataRoot}>
                    <Typography className={classes.noDataTitle} variant="h4" component="h4">
                        No employees yet! <br />
                        <Typography className={classes.noDataSubtitle} variant="body1">
                            Be kind, hire few employees and come back.
                        </Typography>
                    </Typography>
                </div>
            </Layout>
        );
    }

    return (
        <Layout path="Employees">
            <SEO title="Employees" />

            <EmployeeCreationDialog />

            <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} aria-label="Drugs data table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Contact Number</TableCell>
                            <TableCell>Date Of Joining</TableCell>
                            <TableCell>Shift</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow id={employee.id} key={employee.id}>
                                <TableCell component="th" scope="row">
                                    {employee.name}
                                </TableCell>
                                <TableCell>{employee.address}</TableCell>
                                <TableCell>{employee.contact_number}</TableCell>
                                <TableCell>{new Date(employee.date_of_joining).toDateString()}</TableCell>
                                <TableCell>{employee.shift}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    );
};

export async function getServerSideProps() {
    const { entityData, hasErrors, errors } = await fetchEntities('employees');

    if (hasErrors) {
        return {
            props: {
                drugs: null,
                errors,
            },
        };
    }

    return {
        props: {
            employees: entityData['employees'],
            errors: hasErrors ? errors : null,
        },
    };
}

export default AllEmployees;
