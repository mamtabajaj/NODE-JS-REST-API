const express = require('express');
const router = express.Router();

// Sample data
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
];
//http://localhost:3000/users
// Get all users
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});

//http://localhost:3000/users/1

// Get a specific user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (!user) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }
    
    res.status(200).json({
        success: true,
        data: user
    });
});

// Create a new user
router.post('/', (req, res) => {
    const { name } = req.body;
    console.log(req.body.name);

    if (!name) {
        return res.status(400).json({
            success: false,
            error: 'Name is required'
        });
    }

    const newUser = {
        id: users.length + 1,
        name
    };
    users.push(newUser);
//201 status is for users
    res.status(201).json({
        success: true,
        data: newUser
    });
});

// Update a user
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (!user) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }

    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({
            success: false,
            error: 'Name is required to update'
        });
    }

    user.name = name;
    
    res.status(200).json({
        success: true,
        data: user
    });
});
// nohub node app.js > output.log > 2>&1 &
// Delete a user
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }

    users.splice(userIndex, 1);

    res.status(204).json({
        success: true,
        data: null
    });
});

module.exports = router; // Export the router