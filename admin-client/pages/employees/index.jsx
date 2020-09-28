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
import fetchEntities from '../../source/utils/fetchEntities';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    button: {
        marginBottom: theme.spacing(2),
    },
}));

const AllEmployees = ({ employees, errors }) => {
    const classes = useStyles();

    if (errors) {
        return (
            <Layout path="Employees">
                <h1>Something went wrong!</h1>
            </Layout>
        );
    }

    return (
        <Layout path="Employees">
            <SEO title="Employees" />

            <Link href="/drug/add">
                <Button variant="contained" color="secondary" className={classes.button} startIcon={<AddIcon />}>
                    Add Employee
                </Button>
            </Link>

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

    return {
        props: {
            employees: entityData,
            errors: hasErrors ? errors : null,
        },
    };
}

export default AllEmployees;
