const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const compression = require('compression');

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin/drugs', require('./routes/drugs'));

module.exports = app;
