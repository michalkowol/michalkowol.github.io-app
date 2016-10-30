+++
draft = false
date = "2014-10-23"
title = "Scala traits in javascript"
categories = ["development", "javascript"]
tags = ["development", "javascript", "scala"]
+++

Traits:

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