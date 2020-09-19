const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/admin/', require('./routes/admin'));

module.exports = app;
