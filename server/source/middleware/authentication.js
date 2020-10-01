const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { ADMIN_KEY } = require('../utils/config');

const ensureAdminAuthentication = (req, res, next) => {
  try {
    const adminKey = req.headers['admin-key'];

    if (adminKey !== ADMIN_KEY) {
      return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = ensureAdminAuthentication;
