const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware('/auth/google', { target: 'http://localhost:5000' }));
    app.use(createProxyMiddleware('/auth/*', { target: 'http://localhost:5000' }));
    app.use(createProxyMiddleware('/tweet/*', { target: 'http://localhost:5000' }));
    app.use(createProxyMiddleware('/comments/*', { target: 'http://localhost:5000' }));
    app.use(createProxyMiddleware('/profiles/*', { target: 'http://localhost:5000' }));


};