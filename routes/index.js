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
  var _id = req.query._id;
  if(_id){
    return Post.findOne({_id: _id}, function(err, data) {
      console.log(data);
      res.render('admin/write', {
        title: 'Express',
        image: 'home',
        layout: 'admin/layout',
        post: data,
        active: 'write'
      });
    });
  }

  res.render('admin/write', {
    title: 'Express',
    image: 'home',
    layout: 'admin/layout',
    active: 'write'
  });
});

router.post('/write', function(req, res, next) {
  var log = new Post(req.body);
  log.save(function(err) {
    res.redirect('/');
  });
});


router.get('/admin', function(req, res, next) {

  var page = req.query.page || 1;
  Post.list({page: page, limit: 50 }, function(err, data) {

    res.render('admin/index', {
      layout: 'admin/layout',
      posts: data,
      active: 'admin'
    });
  })
});

router.post('/del', function(req, res, next) {
  var _id = req.body._id;
  console.log(_id);
  Post.remove({_id: _id}, function(err) {
    if(err) {
      return res.json({errCode: 500});
    }

    return res.json({errCode:0});
  });
});

router.post('/update', function(req, res, next) {
  var _id = req.body._id;
  var title = req.body.title;
  var author = req.body.author;
  var content = req.body.content;

  console.log(req.body);

  Post.update({_id: _id}, {title: title, author: author, content: content}, function(err, data) {
    if(err) {
      console.log(err);
    }

    res.redirect('/');
  });


});

module.exports = router;
