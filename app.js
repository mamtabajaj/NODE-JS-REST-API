const express = require('express');
const app = express();
const userRoutes = require('./routes/users'); // Import the user routes
app.use(express.json());

// Use the user routes
app.use('/users', userRoutes);

// Error handling for routes that don't exist
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// General error handler (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal Server Error'
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});