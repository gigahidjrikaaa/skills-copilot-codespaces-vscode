// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Setup body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Setup CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow all headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Allow all methods
        return res.status(200).json({});
    }
    next();
});

// Import routes
const commentsRoutes = require('./api/routes/comments');
const usersRoutes = require('./api/routes/users');
const postsRoutes = require('./api/routes/posts');
const authRoutes = require('./api/routes/auth');

// Use routes
app.use('/comments', commentsRoutes);
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/auth', authRoutes);

// Handle errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    // Forward error request to error handler
    next(error);
});

app.use((error, req, res, next) => {
    // Set error status code
    res.status(error.status || 500);
    // Send error response
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;