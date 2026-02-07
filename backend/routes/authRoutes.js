const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const User = require('../models/user.js');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validator.js');


const router = express.Router();

// Register route
router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 character'),
    body('name').notEmpty().withMessage('Name is required')
 ], validate, async (req, res) => {
    try {
        
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        await User.create({ email, password, name });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', [ 
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password required')
 ], validate, async (req, res) => {
    try {
        
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // compares the hash
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // generate Token with ROLE and ID
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ message: 'login successful', token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
         });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/me', authMiddleware, async (req, res) => {
    try {
        // Find user in the DB using the Id extracted from the token
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'role']
        });

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch(error) {
        res.status(500).json({ message: 'Error whil retrieving profile' });
    }
    
})

module.exports = router;