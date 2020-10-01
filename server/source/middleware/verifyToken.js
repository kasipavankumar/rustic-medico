const jwt = require('jsonwebtoken');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { JWT_SECRET } = require('../utils/config');

const ensureAdminAuthentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, JWT_SECRET);

    next();
  } catch (err) {
    console.log(err);

    if (err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: ReasonPhrases.UNAUTHORIZED });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = ensureAdminAuthentication;
