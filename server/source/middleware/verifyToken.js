const jwt = require('jsonwebtoken');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { JWT_SECRET } = require('../utils/config');

const verifyToken = (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(' ')[1];
    const token = req.cookies['_SID_'];

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: ReasonPhrases.UNAUTHORIZED });
    }

    const user = jwt.verify(token, JWT_SECRET);

    res.locals['user'] = user;

    next();
  } catch (err) {
    console.log(err);

    if (err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: ReasonPhrases.UNAUTHORIZED });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = verifyToken;
