import Link from 'next/link';
import { AddIcon, Button, Table, Pane } from 'evergreen-ui';
import { Layout, SEO } from '../../source/components';
import fetchEntities from '../../source/utils/fetchEntities';

const AllDrugs = ({ drugs, errors }) => {
    if (errors) {
        return (
            <Layout>
                <h1>Something went wrong!</h1>
            </Layout>
        );
    }

    return (
        <Layout path="Drugs">
            <SEO title="Drugs" />
            <Pane display="flex" alignItems="center">
                {/* <h1>💊 / Drugs</h1> */}
                <Link href="/drug/add" key="add-new-drug">
                    <Button appearance="primary" intent="success" marginX={0} marginBottom={20} iconBefore={AddIcon}>
                        Add Drug
                    </Button>
                </Link>
            </Pane>
            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Price</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Expiry Date</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Manufacturer</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Supplier</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={'auto'}>
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
    const { entityData, hasErrors, errors } = await fetchEntities('drugs');

    return {
        props: {
            drugs: entityData,
            errors: hasErrors ? errors : null,
        },
    };
}

export default AllDrugs;
