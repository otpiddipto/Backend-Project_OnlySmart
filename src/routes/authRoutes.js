const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const validateRegistration = [
  check('email').isEmail().withMessage('Invalid email format'),
  check('password_hash')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  check('first_name').notEmpty().withMessage('First name is required'),
  check('last_name').notEmpty().withMessage('Last name is required'),
];

const validateLogin = [
  check('email').isEmail().withMessage('Invalid email format'),
  check('password_hash').notEmpty().withMessage('Password is required'),
];

// Routes
router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);

router.get('/profile/', authenticate, authController.getProfile);

module.exports = router;
