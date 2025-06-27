/* import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import api from '../utils/api';

const Shortener = () => {
    const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);
    const [results, setResults] = useState([]);

    const handleChange = (index, field, value) => {
        const updated = [...urls];
        updated[index][field] = value;
        setUrls(updated);
    };

    const addField = () => {
        if (urls.length < 5) setUrls([...urls, { url: '', validity: '', shortcode: '' }]);
    };

    const handleSubmit = async () => {
        const res = [];
        for (let data of urls) {
            if (!data.url.startsWith('http')) {
                alert('Invalid URL format!');
                return;
            }
            try {
                const response = await api.post('/shorturls', {
                    url: data.url,
                    validity: data.validity ? parseInt(data.validity) : undefined,
                    shortcode: data.shortcode || undefined
                });
                res.push(response.data);
            } catch (error) {
                res.push({ error: error.response.data.error });
            }
        }
        setResults(res);
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h5">URL Shortener</Typography>
            {urls.map((item, idx) => (
                <Grid container spacing={1} key={idx} sx={{ my: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Long URL"
                            value={item.url}
                            onChange={(e) => handleChange(idx, 'url', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            label="Validity (min)"
                            value={item.validity}
                            onChange={(e) => handleChange(idx, 'validity', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            label="Custom Shortcode"
                            value={item.shortcode}
                            onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
                        />
                    </Grid>
                </Grid>
            ))}
            <Button onClick={addField} disabled={urls.length >= 5}>Add More</Button>
            <Button variant="contained" onClick={handleSubmit}>Shorten URLs</Button>

            <Typography variant="h6" mt={2}>Results:</Typography>
            {results.map((res, idx) => (
                <Typography key={idx}>
                    {res.shortLink ? `${res.shortLink} (Expires at: ${res.expiry})` : `Error: ${res.error}`}
                </Typography>
            ))}
        </Paper>
    );
};

export default Shortener;
 */
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import api from '../utils/api';
import Log from '../middleware/logger';

const Shortener = () => {
    const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);
    const [results, setResults] = useState([]);

    const handleChange = (index, field, value) => {
        const updated = [...urls];
        updated[index][field] = value;
        setUrls(updated);
    };

    const addField = () => {
        if (urls.length < 5) setUrls([...urls, { url: '', validity: '', shortcode: '' }]);
    };

    const handleSubmit = async () => {
        const res = [];
        for (let data of urls) {
            try {
                const response = await api.post('/shorturls', {
                    url: data.url,
                    validity: data.validity ? parseInt(data.validity) : undefined,
                    shortcode: data.shortcode || undefined
                });
                Log('frontend', 'info', 'component', `Shortened URL: ${data.url}`);
                res.push(response.data);
            } catch (error) {
                Log('frontend', 'error', 'api', `Shorten failed: ${error.message}`);
                res.push({ error: error.response?.data?.error || "Server unreachable" });
            }
        }
        setResults(res);
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h5">URL Shortener</Typography>
            {urls.map((item, idx) => (
                <Grid container spacing={1} key={idx} sx={{ my: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Long URL"
                            value={item.url}
                            onChange={(e) => handleChange(idx, 'url', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            label="Validity (min)"
                            value={item.validity}
                            onChange={(e) => handleChange(idx, 'validity', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            label="Custom Shortcode"
                            value={item.shortcode}
                            onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
                        />
                    </Grid>
                </Grid>
            ))}
            <Button onClick={addField} disabled={urls.length >= 5}>Add More</Button>
            <Button variant="contained" onClick={handleSubmit}>Shorten URLs</Button>

            <Typography variant="h6" mt={2}>Results:</Typography>
            {results.map((res, idx) => (
                <Typography key={idx}>
                    {res.shortLink ? `${res.shortLink} (Expires: ${res.expiry})` : `Error: ${res.error}`}
                </Typography>
            ))}
        </Paper>
    );
};

export default Shortener;
