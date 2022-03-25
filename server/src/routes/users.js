const router = require('express').Router();

const controllers = require('../controllers/users');
const userValidation = require('../../middlewares/UserValidation');

router.get('/', controllers.getUsers);

router.post('/', [userValidation.username, userValidation.fullName, userValidation.email, userValidation.password], controllers.createUser);

module.exports = router;
