import axios from 'axios';
import { Table } from 'evergreen-ui';
import { Layout } from '../../source/components';
import { API_URL, ADMIN_KEY } from '../../source/config';

const AllDrugs = ({ drugs, error }) => {
    return (
        <Layout>
            <h1>All Drugs</h1>
            <Table>
                <Table.Head elevation={1}>
                    <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Price</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Expiry Date</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Manufacturer</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Supplier</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={'max-content'}>
                    {drugs.map((drug) => (
                        <Table.Row id={drug.id} key={drug.id} isSelectable>
                            <Table.TextCell>{drug.name}</Table.TextCell>
                            <Table.TextCell>{`₹ ${drug.price}`}</Table.TextCell>
                            <Table.TextCell>{new Date(drug.expiry_date).toDateString()}</Table.TextCell>
                            <Table.TextCell>{drug.manufacturer_name}</Table.TextCell>
                            <Table.TextCell>{drug.supplier_name}</Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Layout>
    );
};

export async function getServerSideProps() {
    try {
        const {
            data: { drugs },
        } = await axios.get(`${API_URL}/api/admin/drugs/get/all`, {
            headers: {
                'Admin-Key': ADMIN_KEY,
            },
        });

        return {
            props: {
                drugs,
            },
        };
    } catch (err) {
        console.error(err);
        return {
            props: {
                error: true,
            },
        };
    }
}

export default AllDrugs;
