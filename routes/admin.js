'use strict';

const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');
const site = require('../controllers/site');

router.get('/', site.adminIndex);

router.get('/write', posts.ShowWritePost);

router.post('/write', posts.writePost);

router.post('/delete', posts.deletePost);

router.post('/update', posts.updatePost);

module.exports = router;