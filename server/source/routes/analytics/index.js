const { Router } = require('express');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const db = require('../../database');

const AnalyticsRouter = Router();

AnalyticsRouter.get('/page-views', async (req, res) => {
  try {
    const query = 'select * from page_views;';
    const { rows } = await db.query(query);
    res.status(StatusCodes.OK).json({ data: rows });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}).put('/track/page-views/:name', async (req, res) => {
  try {
    const { name: pageName } = req.params;

    const query =
      'insert into page_views (name) values ($1) on conflict (name) do update set views = page_views.views + 1;';

    await db.query(query, [pageName]);

    return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
});

module.exports = AnalyticsRouter;
