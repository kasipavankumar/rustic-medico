const { Router } = require('express');

const handleLogin = require('../../controllers/auth/login');
const handleLogout = require('../../controllers/auth/logout');
const handleRegistration = require('../../controllers/auth/register');

const verifyToken = require('../../middleware/verifyToken');

const AuthRouter = Router();

/**
 * Registration.
 */
AuthRouter.post('/register', handleRegistration);
/**
 * Login.
 */
AuthRouter.post('/login', handleLogin);
/**
 * Logout.
 */
AuthRouter.post('/logout', verifyToken, handleLogout);

module.exports = AuthRouter;
