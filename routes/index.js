'use strict';

const express = require('express');
const router = express.Router();
const site = require('../controllers/site');
const posts = require('../controllers/posts');

router.get(['/', '/index'], site.index);

router.get('/about', site.about);

router.get('/contact', site.contact);

router.get('/post/:_id', posts.showPostByParamsId);

module.exports = router;