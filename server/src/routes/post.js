const router = require('express').Router();

const controllers = require('../controllers/post');

router.post('/:id', controllers.postImage);
router.delete('/', controllers.deleteImage);

module.exports = router;
