const QueryResource = require('../../utils/constants/queryResources');

module.exports = (queryResource) => !!Object.keys(QueryResource).some((resource) => QueryResource[resource] === queryResource);
