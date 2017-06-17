+++
date = "2014-07-22"
title = "\"Closures\" in JavaScript"
description = "Closures and Traits in JavaScript. Polymorphism, encapsulation and inheritance."
categories = ["development", "javascript"]
tags = ["development", "javascript", "closures", "traits", "scala"]
+++

## Closures

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

## Traits

Defintion from [docs.scala-lang.org](http://docs.scala-lang.org/tutorials/tour/traits.html):

> Traits are used to share interfaces and fields between classes. They are similar to Java 8’s interfaces. Classes and objects can extend traits but traits cannot be instantiated and therefore have no parameters.

```javascript
function _extend(object, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            object[key] = source[key];
        }
    }
    return object;
}

function _with() {
    var self = {};
    var args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
        args[i](self);
    }
    self.super = _extend({}, self);
    return self;
}
```

Traits example:

```javascript
var mtv = (function (mtv) {
    'use strict';
 
    mtv.TraitA = function (self) {
        self.functionA = function () {
            console.log('[start]: TraitA.functionA');
            console.log(self.getModel());
            console.log('[end]: TraitA.functionA');
        };
 
        self.dummyModel = function () {
            console.log('[start]: TraitA.dummyModel');
            console.log('[end]: TraitA.dummyModel');
        };
    };
 
    mtv.TraitB = function (self) {
        self.functionB = function () {
            console.log('[start]: TraitB.functionB');
            console.log(self.getModel());
            console.log('[end]: TraitB.functionB');
        };
 
        self.dummyModel = function () {
            console.log('[start]: TraitB.dummyModel');
            console.log('[end]: TraitB.dummyModel');
        };
 
        self.onlyB = function () {
            console.log('[start]: TraitB.onlyB');
            console.log('[end]: TraitB.onlyB');
        };
    };
 
    mtv.classWithTraitATraitB = function (model) {
        var self = _with(mtv.TraitA, mtv.TraitB);
 
        self.getModel = function () {
            console.log('[start]: classWithTraitATraitB.getModel');
            console.log('[end]: classWithTraitATraitB.getModel');
            return model;
        };
 
        self.functionB = function () {
            console.log('[start]: classWithTraitATraitB.functionB');
            self.super.functionB();
            self.functionA();
            console.log('[end]: classWithTraitATraitB.functionB');
        };
 
        return self;
    };
 
    var classA = mtv.classWithTraitATraitB('model');
    classA.functionA();
    classA.functionB();
    classA.dummyModel();
    return mtv;
})(mtv || {});
```

Result:

```
[start]: TraitA.functionA
[start]: classWithTraitATraitB.getModel
[end]: classWithTraitATraitB.getModel
model
[end]: TraitA.functionA
[start]: classWithTraitATraitB.functionB
[start]: TraitB.functionB
[start]: classWithTraitATraitB.getModel
[end]: classWithTraitATraitB.getModel
model
[end]: TraitB.functionB
[start]: TraitA.functionA
[start]: classWithTraitATraitB.getModel
[end]: classWithTraitATraitB.getModel
model
[end]: TraitA.functionA
[end]: classWithTraitATraitB.functionB
[start]: TraitB.dummyModel
[end]: TraitB.dummyModel
```