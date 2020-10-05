const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const handleLogout = (req, res) => {
  res.clearCookie('_SID_', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return res.status(StatusCodes.OK).json({ message: 'logged out' });
};

module.exports = handleLogout;
