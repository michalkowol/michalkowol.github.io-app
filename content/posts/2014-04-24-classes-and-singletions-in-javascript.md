+++
draft = false
date = "2014-04-24"
title = "\"Classes\" and Singletions in JavaScript"
description = "How to simulate Object Oriented programming in JavaScript."
categories = ["development", "javascript"]
tags = ["development", "javascript", "trait"]
+++

In JS there are a lot of way to simulate classes. Here are examples:

```javascript
var com = com || {};

com.MTVClass1 = function (videoID) {
    "use strict";
    var self = {};
 
    function bar() {
        return "bar" + videoID;
    }
 
    self.foo = function () {
        return "foo" + bar() + videoID;
    };
 
    return self;
};

com.MTVClass1("123").foo();
```

```javascript
var com = com || {};
 
(function () {
    'use strict';
 
    com.MTVClass2 = function (videoID) {
        this.videoID = videoID;
    };
 
    function bar() {
        return "bar"; // does not have access to videoID
    }
 
    com.MTVClass2.prototype.foo = function () {
        return "foo" + bar() + this.videoID;
    };
}());

new com.MTVClass2("1234").foo();
```

```javascript
var com = com || {};
 
com.MTVClass3 = (function () {
    'use strict';
 
    function MTVClass3(videoID) {
        this.videoID = videoID;
    }
 
    function bar() {
        return "bar";  // does not have access to videoID
    }
 
    MTVClass3.prototype.foo = function () {
        return "foo" + bar() + this.videoID;
    };
 
    return MTVClass3;
}());

new com.MTVClass3("123").foo();
```

```javascript
var com = com || {};
 
com.MTVClass4 = (function () {
    'use strict';
 
    function MTVClass4(videoID) {
        this.videoID = videoID;
    }
 
    function bar(self) {
        return "bar" + self.videoID;
    }
 
    MTVClass4.prototype.foo = function () {
        return "foo" + bar(this) + this.videoID;
    };
 
    return MTVClass4;
}());

new com.MTVClass4("123").foo();
```

```javascript
var com = com || {};
 
com.MTVObject = (function () {
    "use strict";
    var self = {};
 
    function bar() {
        return "bar";
    }
 
    self.foo = function () {
        return "foo" + bar();
    };
 
    return self;
}());

com.MTVObject.foo();
```

In my option `MTVClass1.js` approach is the best one. `MTVClass1.js` has similar concept like `MTVObject.js`. In `MTVClass2.js` and `MTVClass3.js` you do not have access to class fields. `MTVClass1.js` has some small performance issue, but remeber:

> Premature optimization is the root of all evil.