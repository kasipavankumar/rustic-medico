import { API_URL, ADMIN_KEY } from 'source/config';

const ENTITIES = new Map<string, string>();

ENTITIES.set('EMPLOYEES', 'api/admin/employees/get/all');
ENTITIES.set('DRUGS', 'api/admin/drugs/get/all');
ENTITIES.set('DOCTORS', 'api/admin/doctors/get/all');
ENTITIES.set('CUSTOMERS', 'api/admin/customers/get/all');
ENTITIES.set('MANUFACTURERS', 'api/admin/manufacturers/get/all');
ENTITIES.set('SUPPLIERS', 'api/admin/suppliers/get/all');
ENTITIES.set('SALES', 'api/admin/sales');

export { API_URL, ADMIN_KEY, ENTITIES };
