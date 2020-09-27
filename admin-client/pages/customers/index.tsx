import { Table } from 'evergreen-ui';
import { Layout, SEO } from '../../source/components';
import { fetchEntities } from '../../source/utils';

export default function Customers({ customers, errors }) {
    if (errors) {
        return (
            <Layout path="Customers">
                <h1>Something went wrong!</h1>
            </Layout>
        );
    }

    if (!customers.length) {
        return (
            <Layout path="Customers">
                <h1>No customers yet!</h1>
                <code>Go spread some word and attract customers.</code>
            </Layout>
        );
    }

    return (
        <Layout path="Customers">
            <SEO title="Customers" />
            <h1>🙋‍♂️ / Customers</h1>
            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Address</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Contact Number</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Employee</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Doctor</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={'max-content'}>
                    {customers.map((customer) => (
                        <Table.Row id={customer.id} key={customer.id} isSelectable>
                            <Table.TextCell>{customer.name}</Table.TextCell>
                            <Table.TextCell>{customer.address}</Table.TextCell>
                            <Table.TextCell>{customer.contact_number}</Table.TextCell>
                            <Table.TextCell>{customer.employee_name}</Table.TextCell>
                            <Table.TextCell>{customer.doctor_name}</Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
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
