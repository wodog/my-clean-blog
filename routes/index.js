var express = require('express');
var router = express.Router();
var Blog = require('mongoose').model('Blog');

/* GET home page. */
router.get(['/', '/index'], function(req, res, next) {
  Blog.list({}, function(err, data) {

    res.render('index', {
      title: 'Clean Blog',
      describe: 'A Clean Blog Theme by wodog',
      blogs: data
    });
  });

});

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'About Me',
    describe: 'This is what I do.'
  });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {
    title: 'Contact Me',
    describe: 'Have questions? I have answers (maybe).'
  });
});

router.get('/post/:_id', function(req, res, next) {
  var _id = req.params._id;

  Blog.findOne({
    _id: _id
  }, function(err, data) {
    res.render('post', {
      title: data.title,
      describe: data.author,
      blog: data
    });
  });


});

router.get('/write', function(req, res, next) {
  res.render('write', {
    title: 'Express'
  });
});

router.post('/write', function(req, res, next) {
  var log = new Blog(req.body);
  log.save();
  res.redirect('/');
});

module.exports = router;