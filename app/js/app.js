$ = jQuery = require('../bower_components/jquery/dist/jquery.min');

(function () {
  'use strict';

  var bootstrap = require('../bower_components/bootstrap/dist/js/bootstrap.min');
  var foo = require("./foo");

  $(function () {
    var newFoo = foo.Foo();
    console.log(newFoo.bar());
  });

  (function () {
  })();

  function initHighlightingOnLoad() {
    var highlight = require('../bower_components/highlightjs/highlight.pack');
    highlight.initHighlightingOnLoad();
  }

  initHighlightingOnLoad();
})();