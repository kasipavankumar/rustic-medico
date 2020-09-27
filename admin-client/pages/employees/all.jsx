import axios from 'axios';
import { Table } from 'evergreen-ui';
import { Layout } from '../../source/components';
import { API_URL, ADMIN_KEY } from '../../source/config';

const AllEmployees = ({ employees, error }) => {
    return (
        <Layout>
            <h1>All Employees</h1>
            <Table>
                <Table.Head elevation={1}>
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
    try {
        const {
            data: { employees },
        } = await axios.get(`${API_URL}/api/admin/employees/get/all`, {
            headers: {
                'Admin-Key': ADMIN_KEY,
            },
        });

        return {
            props: {
                employees,
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

export default AllEmployees;
