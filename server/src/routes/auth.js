const router = require('express').Router();

const controllers = require('../controllers/auth');

router.post('/login', controllers.login);
router.get('/token', controllers.refreshToken);
router.delete('/logout', controllers.logout);

module.exports = router;
