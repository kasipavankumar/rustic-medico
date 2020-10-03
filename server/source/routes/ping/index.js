const { Router } = require('express');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const PingRouter = Router();

PingRouter.get('/', (req, res) => {
  try {
    const date = new Date().toISOString();

    return res.status(StatusCodes.OK).send(`Is it coffee time? \n${date}`);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

module.exports = PingRouter;
