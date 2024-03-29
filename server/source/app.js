const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const ensureAdminAuthentication = require('./middleware/authentication');

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5000', 'https://rustic-medico.dkpk.vercel.app', /https:\/\/rustic-medico-admin-.{9}\.vercel\.app$/], credentials: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/ping', require('./routes/ping'));

app.use('/api/_auth', require('./routes/auth'))
app.use('/api/admin/register', require('./routes/admin/register'));
app.use('/api/admin/login', require('./routes/admin/login'));

app.use('/api/admin/drugs', ensureAdminAuthentication, require('./routes/drugs'));
app.use('/api/admin/employees', ensureAdminAuthentication, require('./routes/employees'));
app.use('/api/admin/manufacturers', ensureAdminAuthentication, require('./routes/manufacturers'));
app.use('/api/admin/suppliers', ensureAdminAuthentication, require('./routes/suppliers'));
app.use('/api/admin/customers', ensureAdminAuthentication, require('./routes/customers'));
app.use('/api/admin/doctors', ensureAdminAuthentication, require('./routes/doctors'));
app.use('/api/admin/sales', ensureAdminAuthentication, require('./routes/sales'));

module.exports = app;
