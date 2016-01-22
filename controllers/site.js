'use strict';

const Post = require('mongoose').model('Post');

exports.index = function(req, res, next) {
  const page = req.query.page || 1;

  Post.list({
    page: page
  }, function(err, data) {

    res.render('index', {
      title: 'Clean Blog',
      describe: 'A Clean Blog Theme by wodog',
      blogs: data,
      image: 'home',
      page: page
    });
  });
};

exports.about = function(req, res, next) {
  res.render('about', {
    title: 'About Me',
    describe: 'This is what I do.',
    image: 'about'
  });
};

exports.contact = function(req, res, next) {
  res.render('contact', {
    title: 'Contact Me',
    describe: 'Have questions? I have answers (maybe).',
    image: 'contact'
  });
};

exports.adminIndex = function(req, res, next) {

  var page = req.query.page || 1;
  Post.list({
    page: page,
    limit: 50
  }, function(err, data) {

    res.render('admin/index', {
      layout: 'admin/layout',
      posts: data,
      active: 'admin'
    });
  })
}