const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const ensureAdminAuthentication = require('./middleware/authentication');

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5000', 'https://admin.rustic-medico.ml'] }));
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin/drugs', ensureAdminAuthentication, require('./routes/drugs'));
app.use('/api/admin/employees', ensureAdminAuthentication, require('./routes/employees'));
app.use('/api/admin/manufacturers', ensureAdminAuthentication, require('./routes/manufacturers'));
app.use('/api/admin/suppliers', ensureAdminAuthentication, require('./routes/suppliers'));
app.use('/api/admin/customers', ensureAdminAuthentication, require('./routes/customers'));
app.use('/api/admin/doctors', ensureAdminAuthentication, require('./routes/doctors'));

module.exports = app;
