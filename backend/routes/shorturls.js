/* const express = require('express');
const router = express.Router();
const urls = require('../models/urlModel');
const getGeoLocation = require('../utils/geoLookup');

const BASE_URL = "http://localhost:5000";
const shortCodeRegex = /^[a-zA-Z0-9]{1,10}$/;

function generateShortCode() {
    return Math.random().toString(36).substring(2, 8);
}

// Create Short URL
router.post('/shorturls', (req, res) => {
    const { url, validity, shortcode } = req.body;

    if (!url || !url.startsWith('http')) {
        return res.status(400).json({ error: "Invalid URL format" });
    }

    let code = shortcode;
    if (code) {
        if (!shortCodeRegex.test(code) || urls[code]) {
            return res.status(400).json({ error: "Invalid or duplicate shortcode" });
        }
    } else {
        do {
            code = generateShortCode();
        } while (urls[code]);
    }

    const createdAt = new Date();
    const expireAt = new Date(createdAt.getTime() + (validity || 30) * 60000);

    urls[code] = {
        longUrl: url,
        createdAt,
        expireAt,
        clickCount: 0,
        clicks: []
    };

    res.status(201).json({
        shortLink: `${BASE_URL}/${code}`,
        expiry: expireAt.toISOString()
    });
});

// Redirection
router.get('/:shortcode', (req, res) => {
    const { shortcode } = req.params;
    const data = urls[shortcode];

    if (!data) {
        return res.status(404).json({ error: "Shortcode not found" });
    }

    if (new Date() > data.expireAt) {
        return res.status(410).json({ error: "Link expired" });
    }

    data.clickCount += 1;
    data.clicks.push({
        timestamp: new Date().toISOString(),
        referrer: req.get('Referrer') || 'Direct',
        location: getGeoLocation(req.ip)
    });

    res.redirect(data.longUrl);
});

// Statistics
router.get('/shorturls/:shortcode', (req, res) => {
    const { shortcode } = req.params;
    const data = urls[shortcode];

    if (!data) {
        return res.status(404).json({ error: "Shortcode not found" });
    }

    res.json({
        longUrl: data.longUrl,
        createdAt: data.createdAt.toISOString(),
        expiry: data.expireAt.toISOString(),
        clickCount: data.clickCount,
        clicks: data.clicks
    });
});

module.exports = router;
 */
const express = require('express');
const router = express.Router();
const urls = require('../models/urlModel');
const getGeoLocation = require('../utils/geoLookup');
const Log = require('../../middleware/logger');

const BASE_URL = "http://localhost:5000";
const shortCodeRegex = /^[a-zA-Z0-9]{1,10}$/;

function generateShortCode() {
    return Math.random().toString(36).substring(2, 8);
}

// Create Short URL
router.post('/shorturls', (req, res) => {
    const { url, validity, shortcode } = req.body;

    if (!url || !url.startsWith('http')) {
        Log('backend', 'error', 'handler', 'Invalid URL format in POST /shorturls');
        return res.status(400).json({ error: "Invalid URL format" });
    }

    let code = shortcode;
    if (code) {
        if (!shortCodeRegex.test(code) || urls[code]) {
            Log('backend', 'error', 'handler', 'Invalid or duplicate shortcode');
            return res.status(400).json({ error: "Invalid or duplicate shortcode" });
        }
    } else {
        do {
            code = generateShortCode();
        } while (urls[code]);
    }

    const createdAt = new Date();
    const expireAt = new Date(createdAt.getTime() + (validity || 30) * 60000);

    urls[code] = {
        longUrl: url,
        createdAt,
        expireAt,
        clickCount: 0,
        clicks: []
    };

    Log('backend', 'info', 'service', `Short URL created for ${url} with shortcode ${code}`);

    res.status(201).json({
        shortLink: `${BASE_URL}/${code}`,
        expiry: expireAt.toISOString()
    });
});

// Redirect
router.get('/:shortcode', (req, res) => {
    const { shortcode } = req.params;
    const data = urls[shortcode];

    if (!data) {
        Log('backend', 'error', 'route', `Shortcode ${shortcode} not found`);
        return res.status(404).json({ error: "Shortcode not found" });
    }

    if (new Date() > data.expireAt) {
        Log('backend', 'warn', 'handler', `Link expired for shortcode ${shortcode}`);
        return res.status(410).json({ error: "Link expired" });
    }

    data.clickCount += 1;
    data.clicks.push({
        timestamp: new Date().toISOString(),
        referrer: req.get('Referrer') || 'Direct',
        location: getGeoLocation(req.ip)
    });

    Log('backend', 'info', 'route', `Redirecting for shortcode ${shortcode}`);
    res.redirect(data.longUrl);
});

// Statistics
router.get('/shorturls/:shortcode', (req, res) => {
    const { shortcode } = req.params;
    const data = urls[shortcode];

    if (!data) {
        Log('backend', 'error', 'route', `Stats requested for invalid shortcode ${shortcode}`);
        return res.status(404).json({ error: "Shortcode not found" });
    }

    res.json({
        longUrl: data.longUrl,
        createdAt: data.createdAt.toISOString(),
        expiry: data.expireAt.toISOString(),
        clickCount: data.clickCount,
        clicks: data.clicks
    });
});

module.exports = router;
