// server.js
const http = require('http');
const url = require('url');
const { registerUser, loginUser } = require('./controller');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;
    const method = req.method.toLowerCase();

    // Helper to parse JSON body
    function parseBody(callback) {
        let body = '';
        req.on('data', chunk => (body += chunk.toString()));
        req.on('end', () => callback(JSON.parse(body)));
    }
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify your frontend URL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow these HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow these headers

    // Handle preflight (OPTIONS) requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204); // No Content
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');

    if (pathname === '/register' && method === 'post') {
        parseBody(({ email, password }) => {
            registerUser(email, password, (err, response) => {
                if (err) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.end();
                }
            });
        });
    } else if (pathname === '/login' && method === 'post') {
        parseBody(({ email, password }) => {
            loginUser(email, password, (err, response) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Server error' }));
                } else {
                    res.end(JSON.stringify(response));
                }
            });
        });
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
