const router = require('express').Router();

const controllers = require('../controllers/users');

router.get('/', controllers.getUsers);

module.exports = router;
