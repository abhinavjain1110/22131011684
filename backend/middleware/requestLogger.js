const Log = require('../../middleware/logger');

const requestLogger = (req, res, next) => {
    const message = `Incoming request: ${req.method} ${req.originalUrl}`;
    Log('backend', 'info', 'middleware', message);
    next();
};

module.exports = requestLogger;
