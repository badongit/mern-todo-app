const express = require('express');
const postController = require('../controllers/postController');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

router
    .route('/')
    .post(verifyToken, postController.create)
    .get(verifyToken, postController.getPosts)

router
    .route('/:id')
    .put(verifyToken, postController.update)
    .delete(verifyToken, postController.destroy)
    .get(verifyToken, postController.getPostById)

module.exports = router;