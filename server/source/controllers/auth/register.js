const { Router } = require('express');
const bcrypt = require('bcrypt');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const pool = require('../../database');

const handleRegistration = async (req, res) => {
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
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          error: ReasonPhrases.BAD_REQUEST,
          message: 'registration failed',
        });
    }
    /**
     * Hash (salt) the password before saving.
     */
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      'insert into superuser_login (username, password) values ($1, $2);';
    /**
     * Run query on database to insert new admin.
     */
    await pool.query(query, [username, hashedPassword]);
    /**
     * Admin has been registered successfully.
     */
    return res
      .status(StatusCodes.OK)
      .json({ message: 'registration successful' });
  } catch (err) {
    /**
     * Admin already registered.
     */
    if (err.code === '23505') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          error: ReasonPhrases.BAD_REQUEST,
          message: 'registration failed',
        });
    }
    /**
     * Something went wrong with server.
     */
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

module.exports = handleRegistration;
