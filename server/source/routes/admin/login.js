/**
 * server/source/routes/admin/login.js
 *
 * Handles admin login process.
 */

const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const pool = require('../../database');
const { JWT_SECRET } = require('../../utils/config');

const LoginRouter = Router();

LoginRouter.post('/', async (req, res) => {
  try {
    /**
     * Get admin details from the request's body.
     */
    const {
      admin: { username, password },
    } = req.body;
    /**
     * In case there is no username or password.
     */
    if (!username || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: ReasonPhrases.BAD_REQUEST, message: 'invalid credentials' });
    }

    const query = 'select * from superuser_login where username = $1;';

    /**
     * Query database for admin.
     */
    const { rows } = await pool.query(query, [username]);
    /**
     * Admin is not registered.
     */
    if (!rows.length) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: ReasonPhrases.BAD_REQUEST, message: 'authentication failed' });
    }
    /**
     * Compare & validate the hashed password.
     */
    const validPassword = await bcrypt.compare(password, rows[0].password);
    /**
     * Password sent from the client is invalid.
     */
    if (!validPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: ReasonPhrases.BAD_REQUEST, message: 'authentication failed' });
    }
    /**
     * Create a encoded token using jsonwebtokens.
     */
    const token = jwt.sign({ adminID: rows[0].id, username: rows[0].username }, JWT_SECRET);
    /**
     * Credentials are valid, token is generated, set the cookie and proceed to login the admin.
     */

    // TODO: This part is responsible for sending cookies.
    // To be used from API v2.
    // res.cookie('_SID_', token, {
    //   path: '/',
    //   httpOnly: true,
    //   sameSite: 'lax',
    //   secure: process.env.NODE_ENV === 'production',
    // });

    return res.status(StatusCodes.OK).json({ message: 'logged in' });
  } catch (err) {
    /**
     * Something went wrong with server.
     */
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

module.exports = LoginRouter;
