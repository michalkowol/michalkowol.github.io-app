+++
draft = false
date = "2014-07-22"
title = "\"Closures\" in JavaScript"
categories = ["development", "javascript"]
tags = ["development", "javascript"]
+++

Closures in JS can simulate classes. Polymorphism, encapsulation and inheritance are avilable in this aproach.

```javascript
function _extend(object, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            object[key] = source[key];
        }
    }
    return object;
}
```

```javascript
var mtv = (function (mtv) {
    'use strict';
 
    mtv.ClassA = function (a) {
        var self = {};
        self.a = a;
 
        function privateInA () {
            console.log('ClassA.privateInA.start');
            console.log(self.a);
            console.log('ClassA.privateInA.end');
        }
 
        self.bar = function () {
            console.log('ClassA.bar.start');
            self.foo();
            privateInA();
            console.log('ClassA.bar.end');
        };
 
        self.foo = function () {
            console.log('ClassA.foo.start');
            console.log(self.a);
            console.log('ClassA.foo.end');
        };
 
        self.changeA = function () {
            console.log('ClassA.changeA.start');
            self.a = self.a + ' Kowol';
            console.log('ClassA.changeA.end');
        };
 
        return self;
    };
 
    mtv.ClassB = function (b) {
        var self = mtv.ClassA(b);
        var _super = _extend({}, self);
        self.b = b;
 
        self.foo = function () {
            console.log('ClassB.foo.start');
            console.log(self.b + ' ' + self.a);
            _super.foo();
            console.log('ClassB.foo.end');
        };
 
        return self;
    };
 
    return mtv;
})(mtv || {});
```

Example:

```javascript
var classB = mtv.ClassB('Michal');
classB.foo();       // ClassB.foo.start
                    // Michal Michal
                    // ClassA.foo.start
                    // Michal
                    // ClassA.foo.end
                    // ClassB.foo.end
 
classB.bar();       // ClassA.bar.start
                    // ClassB.foo.start
                    // Michal Michal
                    // ClassA.foo.start
                    // Michal
                    // ClassA.foo.end
                    // ClassB.foo.end
                    // ClassA.privateInA.start
                    // Michal
                    // ClassA.privateInA.end
                    // ClassA.bar.end
 
classB.changeA();   // ClassA.changeA.start
                    // ClassA.changeA.end
 
classB.bar();       // ClassA.bar.start
                    // ClassB.foo.start
                    // Michal Michal Kowol
                    // ClassA.foo.start
                    // Michal Kowol
                    // ClassA.foo.end
                    // ClassB.foo.end
                    // ClassA.privateInA.start
                    // Michal Kowol
                    // ClassA.privateInA.end
                    // ClassA.bar.end
```