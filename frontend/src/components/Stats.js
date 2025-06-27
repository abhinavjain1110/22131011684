/* import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import api from '../utils/api';

const Stats = () => {
    const [shortcode, setShortcode] = useState('');
    const [data, setData] = useState(null);

    const handleFetch = async () => {
        try {
            const res = await api.get(`/shorturls/${shortcode}`);
            setData(res.data);
        } catch (err) {
            setData({ error: err.response.data.error });
        }
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h5">Short URL Statistics</Typography>
            <TextField
                label="Shortcode"
                value={shortcode}
                onChange={(e) => setShortcode(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={handleFetch}>Fetch Stats</Button>

            {data && (
                <div>
                    {data.error ? (
                        <Typography color="error">{data.error}</Typography>
                    ) : (
                        <>
                            <Typography>Long URL: {data.longUrl}</Typography>
                            <Typography>Created At: {data.createdAt}</Typography>
                            <Typography>Expiry: {data.expiry}</Typography>
                            <Typography>Click Count: {data.clickCount}</Typography>
                            <Typography>Click Details:</Typography>
                            {data.clicks.map((click, idx) => (
                                <Typography key={idx}>• {click.timestamp} from {click.referrer} at {click.location}</Typography>
                            ))}
                        </>
                    )}
                </div>
            )}
        </Paper>
    );
};

export default Stats;
 */
import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import api from '../utils/api';
import Log from '../middleware/logger';

const Stats = () => {
    const [shortcode, setShortcode] = useState('');
    const [data, setData] = useState(null);

    const handleFetch = async () => {
        try {
            const res = await api.get(`/shorturls/${shortcode}`);
            Log('frontend', 'info', 'component', `Fetched stats for ${shortcode}`);
            setData(res.data);
        } catch (err) {
            Log('frontend', 'error', 'api', `Stats fetch failed: ${err.message}`);
            setData({ error: err.response?.data?.error || "Server unreachable" });
        }
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h5">Short URL Statistics</Typography>
            <TextField
                label="Shortcode"
                value={shortcode}
                onChange={(e) => setShortcode(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={handleFetch}>Fetch Stats</Button>

            {data && (
                <div>
                    {data.error ? (
                        <Typography color="error">{data.error}</Typography>
                    ) : (
                        <>
                            <Typography>Long URL: {data.longUrl}</Typography>
                            <Typography>Created At: {data.createdAt}</Typography>
                            <Typography>Expiry: {data.expiry}</Typography>
                            <Typography>Click Count: {data.clickCount}</Typography>
                            <Typography>Click Details:</Typography>
                            {data.clicks.map((click, idx) => (
                                <Typography key={idx}>
                                    • {click.timestamp} from {click.referrer} at {click.location}
                                </Typography>
                            ))}
                        </>
                    )}
                </div>
            )}
        </Paper>
    );
};

export default Stats;
