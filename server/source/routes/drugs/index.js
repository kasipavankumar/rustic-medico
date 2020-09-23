const { Router } = require('express');
const pool = require('../../database');

const DrugsRouter = Router();

DrugsRouter.get('/get/all', async (req, res) => {
    const { rows } = await pool.query('select * from employees;');
    res.status(200).json({ employees: rows });
});

module.exports = DrugsRouter;
