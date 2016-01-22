'use strict';

var hbs = require('hbs');
const moment = require('moment');
const mditor = require("mditor");
const parser = new mditor.Parser();

hbs.registerHelper('moment', function(v) {
  return moment(v).format('MM-DD HH:mm');
});
hbs.registerHelper('plus', function(v1, v2) {
  return Number.parseInt(v1) + Number.parseInt(v2);
});
hbs.registerHelper('minus', function(v1, v2) {
  return Number.parseInt(v1) - Number.parseInt(v2);
});
hbs.registerHelper('equal', function(v1, v2, options) {
  if(v1 == v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
hbs.registerHelper('md', function(v) {
  return parser.parse(v);
});
hbs.registerHelper('equal_return', function(v1, v2, v3) {
  if(v1 == v2) {
    return v3;
  }
  return;
});