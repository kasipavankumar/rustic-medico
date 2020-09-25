const availableQueryResources = {
    drugs: 'drugs',
    employees: 'employees',
    drug_manufacturers: 'drug_manufacturers',
    suppliers: 'suppliers',
    customers: 'customers',
    doctors: 'doctors',
};

module.exports = (queryResource) => !!Object.keys(availableQueryResources).includes(queryResource);
