const router = require('express').Router();

const users = require('./users');
const auth = require('./auth');
const post = require('./post');

router.use('/users', users);
router.use('/', auth);
router.use('/post', post);

module.exports = router;
