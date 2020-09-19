const express = require('express');

const adminRouter = express.Router();

adminRouter.get('/', function (req, res) {
    res.status(200).json({ message: 'Hey, this is an admin route!' });
});

module.exports = adminRouter;
