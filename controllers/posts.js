'use strict';

const Post = require('mongoose').model('Post');

exports.showPostByParamsId = function(req, res, next) {
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
};

exports.ShowWritePost = function(req, res, next) {
  var _id = req.query._id;
  if (_id) {
    return Post.findOne({
      _id: _id
    }, function(err, data) {
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
};

exports.writePost = function(req, res, next) {
  var log = new Post(req.body);
  log.save(function(err) {
    res.redirect('/');
  });
};

exports.deletePost = function(req, res, next) {
  var _id = req.body._id;
  console.log(_id);
  Post.remove({
    _id: _id
  }, function(err) {
    if (err) {
      return res.json({
        errCode: 500
      });
    }

    return res.json({
      errCode: 0
    });
  });
};

exports.updatePost = function(req, res, next) {
  var _id = req.body._id;
  var title = req.body.title;
  var author = req.body.author;
  var content = req.body.content;

  console.log(req.body);

  Post.update({
    _id: _id
  }, {
    title: title,
    author: author,
    content: content
  }, function(err, data) {
    if (err) {
      console.log(err);
    }

    res.redirect('/');
  });
};