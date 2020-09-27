import { Table } from 'evergreen-ui';
import { Layout, SEO } from '../../source/components';
import fetchEntities from '../../source/utils/fetchEntities';

const AllEmployees = ({ employees, errors }) => {
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
            {/* <h1>👨‍💼 / Employees</h1> */}
            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Address</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Contact Number</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Date Of Joining</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Shift</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={'max-content'}>
                    {employees.map((employee) => (
                        <Table.Row id={employee.id} key={employee.id} isSelectable>
                            <Table.TextCell>{employee.name}</Table.TextCell>
                            <Table.TextCell>{employee.address}</Table.TextCell>
                            <Table.TextCell>{employee.contact_number}</Table.TextCell>
                            <Table.TextCell>{new Date(employee.date_of_joining).toDateString()}</Table.TextCell>
                            <Table.TextCell>{employee.shift}</Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
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
