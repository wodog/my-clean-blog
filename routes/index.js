var express = require('express');
var router = express.Router();
var Post = require('mongoose').model('Post');


/* GET home page. */
router.get(['/', '/index'], function(req, res, next) {
  const page = req.query.page || 1;

  Post.list({page: page}, function(err, data) {

    res.render('index', {
      title: 'Clean Blog',
      describe: 'A Clean Blog Theme by wodog',
      blogs: data,
      image: 'home',
      page: page
    });
  });

});

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'About Me',
    describe: 'This is what I do.',
    image: 'about'
  });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {
    title: 'Contact Me',
    describe: 'Have questions? I have answers (maybe).',
    image: 'contact'
  });
});

router.get('/post/:_id', function(req, res, next) {
  var _id = req.params._id;

  Post.findOne({
    _id: _id
  }, function(err, data) {
    res.render('post', {
      title: data.title,
      describe: 'by ' + data.author,
      image: 'post',
      blog: data
    });
  });


});

router.get('/write', function(req, res, next) {
  res.render('write', {
    title: 'Express',
    image: 'home',
    layout: false
  });
});

router.post('/write', function(req, res, next) {
  var log = new Post(req.body);
  log.save();
  res.redirect('/');
});

module.exports = router;
