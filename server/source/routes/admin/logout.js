const { Router } = require('express');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const LogoutRouter = Router();

LogoutRouter.get('/', (req, res) => {
  res.clearCookie('_SID_', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.OK).send(ReasonPhrases.OK);
});

module.exports = LogoutRouter;
