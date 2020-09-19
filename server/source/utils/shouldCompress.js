const compression = require('compression');

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false;
  }

  return compression.filter(req, res);
}

module.exports = shouldCompress;
