const { Router } = require('express');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const db = require('../../database');

const SalesRouter = Router();

SalesRouter.get('/', async (req, res) => {
  try {
    const query = 'select * from sales;';

    const { rows } = await db.query(query);

    return res.status(200).json({ salesData: rows });
  } catch (err) {
    console.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
});

module.exports = SalesRouter;
