const jwt = require('jsonwebtoken');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const { JWT_SECRET } = require('../utils/config');

/**
 * Middleware function to verify incoming JWT tokens
 * attached by cookieParser.
 *
 * @param {Request} req Express Request
 * @param {Response} res Express Response
 * @param {import('express').NextFunction} next Next middleware in queue
 */
const verifyToken = (req, res, next) => {
  try {
    /**
     * cookieParser will attach all incoming cookies to the req.cookies object.
     */
    const token = req.cookies['_SID_'] || null;
    /**
     * Token is not present.
     */
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: ReasonPhrases.UNAUTHORIZED });
    }
    /**
     * Token is recieved, verify it with SECRET.
     */
    jwt.verify(token, JWT_SECRET);
    /**
     * Token verified, call next middleware.
     */
    next();
  } catch (err) {
    /**
     * If JWT is not attached or has expired,
     * api should respond with UNAUTHORIZED.
     */
    if (
      err instanceof jwt.TokenExpiredError ||
      err instanceof jwt.JsonWebTokenError
    ) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: ReasonPhrases.UNAUTHORIZED });
    }
    /**
     * Something went wrong with server.
     */
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = verifyToken;
