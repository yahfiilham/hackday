const router = require('express').Router();

const controllers = require('../controllers/users');
const userValidation = require('../../middlewares/UserValidation');
const verifyToken = require('../../middlewares/VerifyToken');

router.get('/', verifyToken, controllers.getUsers);

router.post('/', [userValidation.username, userValidation.fullName, userValidation.email, userValidation.password], controllers.createUser);

router.get('/:id', controllers.getUserById);

module.exports = router;
