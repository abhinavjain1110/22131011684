const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });

const logger = (req, res, next) => {
    const log = `${new Date().toISOString()} ${req.method} ${req.originalUrl}\n`;
    logStream.write(log);
    next();
};

module.exports = logger;
