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
import { DataGrid } from '@material-ui/data-grid';
import { Layout, SEO } from '../../source/components';
import { DrugsCreationDialog } from '../../source/components/EntityCreationDialogs';
import fetchEntities from '../../source/utils/fetchEntities';
import { useEffect } from 'react';
import { useState } from 'react';

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
    dataGridRoot: {
        height: '565px',
        width: '100%',
    },
}));

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price (INR)', width: 150 },
    { field: 'medical_description', headerName: 'Medical Description', width: 350 },
    { field: 'manufacturing_date', headerName: 'Manufacturing Date', width: 200 },
    { field: 'expiry_date', headerName: 'Expiry Date', width: 200 },
    { field: 'manufacturer_name', headerName: 'Manufacturer', width: 300 },
    { field: 'supplier_name', headerName: 'Supplier', width: 250 },
    { field: 'created_at', headerName: 'Created At', width: 150 },
    { field: 'updated_at', headerName: 'Updated At', width: 150 },
];

const AllDrugs = ({ drugs, errors }) => {
    const classes = useStyles();

    const rows = drugs.map((drug, i) => {
        const { name, price, medical_description, manufacturing_date, expiry_date, manufacturer_name, supplier_name, created_at, updated_at } = drug;

        return {
            id: i + 1,
            name,
            price,
            medical_description,
            manufacturing_date: new Date(manufacturing_date).toDateString(),
            expiry_date: new Date(expiry_date).toDateString(),
            manufacturer_name,
            supplier_name,
            created_at: new Date(created_at).toDateString(),
            updated_at: new Date(updated_at).toDateString(),
        };
    });

    if (errors) {
        return (
            <Layout path="Drugs">
                <SEO title="Drugs" faviconEmoji="💊" />
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

    if (!drugs.length) {
        return (
            <Layout path="Customers">
                <SEO title="Drugs" faviconEmoji="💊" />
                <DrugsCreationDialog />
                <div className={classes.noDataRoot}>
                    <Typography className={classes.noDataTitle} variant="h4" component="h4">
                        No drugs yet! <br />
                        <Typography className={classes.noDataSubtitle} variant="body1">
                            Go ahead and add as many drugs as you want.
                        </Typography>
                    </Typography>
                </div>
            </Layout>
        );
    }

    return (
        <Layout path="Drugs">
            <SEO title="Drugs" faviconEmoji="💊" />

            <DrugsCreationDialog />

            {/* <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} aria-label="Drugs data table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Medical Description</TableCell>
                            <TableCell>Manufacturing Date</TableCell>
                            <TableCell>Expiry Date</TableCell>
                            <TableCell>Manufacturer</TableCell>
                            <TableCell>Supplier</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {drugs.map((drug) => (
                            <TableRow id={drug.id} key={drug.id}>
                                <TableCell component="th" scope="row">
                                    {drug.name}
                                </TableCell>
                                <TableCell>{`₹ ${drug.price}`}</TableCell>
                                <TableCell>{drug.medical_description}</TableCell>
                                <TableCell>{new Date(drug.manufacturing_date).toDateString()}</TableCell>
                                <TableCell>{new Date(drug.expiry_date).toDateString()}</TableCell>
                                <TableCell>{drug.manufacturer_name}</TableCell>
                                <TableCell>{drug.supplier_name}</TableCell>
                                <TableCell>{new Date(drug.created_at).toDateString()}</TableCell>
                                <TableCell>{new Date(drug.updated_at).toDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}

            <div className={classes.dataGridRoot}>
                <DataGrid rows={rows} columns={columns} pageSize={8} />
            </div>
        </Layout>
    );
};

export async function getServerSideProps() {
    const { entityData, hasErrors, errors } = await fetchEntities('drugs');

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
            drugs: entityData['drugs'],
            errors: null,
        },
    };
}

export default AllDrugs;
