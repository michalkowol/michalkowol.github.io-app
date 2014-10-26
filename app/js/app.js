$ = jQuery = require('../bower_components/jquery/dist/jquery.min');
var bootstrap = require('../bower_components/bootstrap/dist/js/bootstrap.min');
var foo = require("./foo");

$(function () {
  'use strict';
  var newFoo = foo.Foo();
  console.log(newFoo.foo());
});