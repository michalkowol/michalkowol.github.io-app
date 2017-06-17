+++
date = "2014-04-24"
title = "\"Classes\" and Singletions in JavaScript"
description = "How to simulate Object Oriented programming in JavaScript."
categories = ["development", "javascript"]
tags = ["development", "javascript", "oop"]
+++

## Overview

Javascript way to simulate Object-Oriented-Programming.

## Classes

In JS there are a lot of way to simulate classes.

### Example 1

```javascript
var com = com || {};

com.Video = function (videoID) {
    'use strict';
    var self = {};
 
    function bar() {
        return 'bar' + videoID;
    }
 
    self.foo = function () {
        return 'foo' + bar() + videoID;
    };
 
    return self;
};

com.Video('123').foo();
```

### Example 2

```javascript
var com = com || {};
 
(function () {
    'use strict';
 
    com.Video = function (videoID) {
        this.videoID = videoID;
    };
 
    function bar() {
        return 'bar'; // it does not have access to videoID
    }
 
    com.Video.prototype.foo = function () {
        return 'foo' + bar() + this.videoID;
    };
}());

new com.Video('123').foo();
```

### Example 3

```javascript
var com = com || {};
 
com.Video = (function () {
    'use strict';
 
    function Video(videoID) {
        this.videoID = videoID;
    }
 
    function bar() {
        return 'bar';  // it does not have access to videoID
    }
 
    Video.prototype.foo = function () {
        return 'foo' + bar() + this.videoID;
    };
 
    return Video;
}());

new com.Video('123').foo();
```

### Example 4

```javascript
var com = com || {};
 
com.Video = (function () {
    'use strict';
 
    function Video(videoID) {
        this.videoID = videoID;
    }
 
    function bar(self) {
        return 'bar' + self.videoID;
    }
 
    Video.prototype.foo = function () {
        return 'foo' + bar(this) + this.videoID;
    };
 
    return Video;
}());

new com.Video('123').foo();
```

In my option apporach from Example 1 is the best one. In Example 2 and Example 3 we do not have access to class fields. Example 1 has some small performance issue, but remeber:

> Premature optimization is the root of all evil.

## Objects

Sometimes you need to create Singleton Objects. It is a good way to store procedures - in example factory methods.

```javascript
var com = com || {};
 
com.VideoObject = (function () {
    'use strict';
    var self = {};
 
    function bar() {
        return 'bar';
    }
 
    self.foo = function () {
        return 'foo' + bar();
    };
 
    return self;
}());

com.VideoObject.foo();
```