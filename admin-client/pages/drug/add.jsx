import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button, Pane, Heading, TextInputField } from 'evergreen-ui';
import { Layout, SEO } from '../../source/components';
import { API_URL, ADMIN_KEY } from '../../source/config';

const AddDrug = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(1);
    const [expiry_date, setExpiryDate] = useState('');
    const [manufacturer_name, setManufacturerName] = useState('');
    const [supplier_name, setSupplierName] = useState('');

    const handleFromSubmission = (e) => {
        e.preventDefault();
        console.log('Form submission started!', name, price, expiry_date, manufacturer_name, supplier_name);
        axios({
            method: 'POST',
            url: `${API_URL}/api/admin/drugs/add/one`,
            headers: {
                'Admin-Key': ADMIN_KEY,
                'Content-Type': 'application/json',
            },
            data: {
                drug: {
                    name,
                    price,
                    expiry_date,
                    manufacturer_name,
                    supplier_name,
                },
            },
        }).then((r) => {
            router.push('/drugs/all');
        });
    };

    return (
        <Layout path="Add Drug">
            <SEO title="Add New Drug" />
            <div className="form-container">
                <Pane elevation={2} padding={20}>
                    <form>
                        <Heading marginY={15} size={600}>
                            Add Drug
                        </Heading>
                        <TextInputField required type="text" label="Name" name="name" htmlFor="name" placeholder="Enter drug name" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextInputField
                            required
                            type="number"
                            name="price"
                            htmlFor="price"
                            label="Price"
                            placeholder="Enter drug price"
                            min="1"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextInputField
                            required
                            type="date"
                            name="expiry_date"
                            htmlFor="expiry_date"
                            label="Expiry Date"
                            placeholder="Enter drug expiry date"
                            value={expiry_date}
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                        <TextInputField
                            required
                            type="text"
                            name="manufacturer_name"
                            htmlFor="manufacturer_name"
                            label="Manufacturer"
                            placeholder="Enter drug manufacturer's name"
                            value={manufacturer_name}
                            onChange={(e) => setManufacturerName(e.target.value)}
                        />
                        <TextInputField
                            required
                            type="text"
                            name="supplier_name"
                            htmlFor="supplier_name"
                            label="Supplier"
                            placeholder="Enter drug supplier's name"
                            value={supplier_name}
                            onChange={(e) => setSupplierName(e.target.value)}
                        />
                        <Button appearance="primary" onClick={handleFromSubmission}>
                            Submit
                        </Button>
                    </form>
                </Pane>
            </div>
            <style jsx>{`
                .form-container {
                    max-width: 400px;
                    margin: auto;
                }
            `}</style>
        </Layout>
    );
};

export default AddDrug;
