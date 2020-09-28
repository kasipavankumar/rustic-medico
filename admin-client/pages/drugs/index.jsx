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
import { DrugsCreationDialog } from '../../source/components/EntityCreationDialogs';
import fetchEntities from '../../source/utils/fetchEntities';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    button: {
        marginBottom: theme.spacing(2),
    },
}));

const AllDrugs = ({ drugs, errors }) => {
    const classes = useStyles();

    if (errors) {
        return (
            <Layout>
                <Typography variant="h2" component="h2">
                    Something went wrong!
                </Typography>
            </Layout>
        );
    }

    return (
        <Layout path="Drugs">
            <SEO title="Drugs" />

            {/* <Link href="/drug/add">
                <Button variant="contained" color="secondary" className={classes.button} startIcon={<AddIcon />}>
                    Add Drug
                </Button>
            </Link> */}

            <DrugsCreationDialog />

            <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} aria-label="Drugs data table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Expiry Date</TableCell>
                            <TableCell>Manufacturer</TableCell>
                            <TableCell>Supplier</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {drugs.map((drug) => (
                            <TableRow id={drug.id} key={drug.id}>
                                <TableCell component="th" scope="row">
                                    {drug.name}
                                </TableCell>
                                <TableCell>{`₹ ${drug.price}`}</TableCell>
                                <TableCell>{new Date(drug.expiry_date).toDateString()}</TableCell>
                                <TableCell>{drug.manufacturer_name}</TableCell>
                                <TableCell>{drug.supplier_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    );
};

export async function getServerSideProps() {
    const { entityData, hasErrors, errors } = await fetchEntities('drugs');

    return {
        props: {
            drugs: entityData,
            errors: hasErrors ? errors : null,
        },
    };
}

export default AllDrugs;
