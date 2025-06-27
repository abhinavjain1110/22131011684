/* const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('./logger');
const shortUrlRoutes = require('./routes/shorturls');

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/', shortUrlRoutes);

app.listen(5000, () => {
    console.log('Backend Server running on http://localhost:5000');
});
 */
const express = require('express');
const cors = require('cors');
const app = express();
const Log = require('../middleware/logger');
const shortUrlRoutes = require('./routes/shorturls');
const requestLogger = require('./middleware/requestLogger');

app.use(cors());
app.use(express.json());

// ✅ Logging all incoming requests
app.use(requestLogger);

// Routes
app.use('/', shortUrlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    Log('backend', 'fatal', 'middleware', `Unhandled error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(5000, () => {
    Log('backend', 'info', 'service', 'Backend server started on port 5000');
    console.log('Server running on port 5000');
});
