module.exports = (function () {
    'use strict';
    var self = {};

    self.Foo = function () {
        var self = {};

        self.foo = function () {
            return "foo";
        };

        self.bar = function () {
            return "bar";
        };

        return self;
    };

    return self;
}());