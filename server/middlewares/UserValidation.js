const { body } = require('express-validator');

module.exports = {
  username: body('username').notEmpty().withMessage('username cannot be empty'),
  fullName: body('fullName').notEmpty().withMessage('fullname cannot be empty'),
  email: body('email').notEmpty().withMessage('email cannot be empty').isEmail().withMessage('Not an email'),
  password: body('password').notEmpty().withMessage('password cannot be empty').isLength({ min: 8 }).withMessage('password has at least 8 characters'),
};
