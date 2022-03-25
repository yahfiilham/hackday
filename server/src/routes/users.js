const router = require('express').Router();

const controllers = require('../controllers/users');

const { body } = require('express-validator');

router.get('/', controllers.getUsers);

router.post(
  '/',
  [
    body('username').notEmpty().withMessage('username cannot be empty'),
    body('fullName').notEmpty().withMessage('fullname cannot be empty'),
    body('email').notEmpty().withMessage('email cannot be empty').isEmail().withMessage('Not an email'),
    body('password').notEmpty().withMessage('password cannot be empty').isLength({ min: 8 }).withMessage('password has at least 8 characters'),
  ],
  controllers.createUser,
);

module.exports = router;
