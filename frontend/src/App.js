/* import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Shortener from './components/Shortener';
import Stats from './components/Stats';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>URL Shortener</Typography>
                    <Button color="inherit" component={Link} to="/">Shorten URLs</Button>
                    <Button color="inherit" component={Link} to="/stats">Stats</Button>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/" element={<Shortener />} />
                <Route path="/stats" element={<Stats />} />
            </Routes>
        </Router>
    );
}

export default App;
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Shortener from './components/Shortener';
import Stats from './components/Stats';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar sx={{backgroundColor:"black"}}>
                    <Typography variant="h6" sx={{ flexGrow: 1}}>URL Shortener</Typography>
                    <Button color="inherit" sx={{padding: 2, borderBlockColor:"white"}} component={Link} to="/">Shorten URLs</Button>
                    <Button color="inherit" component={Link} to="/stats">Stats</Button>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/" element={<Shortener />} />
                <Route path="/stats" element={<Stats />} />
            </Routes>
        </Router>
    );
}

export default App;
