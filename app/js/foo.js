module.exports = (function () {
    'use strict';
    var self = {};

    self.Foo = function () {
        var self = {};

        self.foo = function () {
            return "foo";
        };

        return self;
    };

    return self;
}());