+++
date = "2013-11-22"
title = "Java Puzzle - initialization order"
description = "Java Puzzle and initialization order. Recruitment question."
categories = ["development", "java", "jvm"]
tags = ["development", "java", "jvm", "puzzle", "recruitment"]
+++

## Overview

When I applied my first full-time job, a guy during recruitment showed me the following code and asked me what would happen? It supposed to show if I understand initialization order in Java.

## Example

```java
class ClassMain {

    private final String mainVar = "Main";

    ClassMain() {
        showMeTheMain();
    }

    protected void showMeTheMain() {
        System.out.println(mainVar);
    }
}

class ClassA extends ClassMain {

    private String a = "qwerty";

    ClassA() {
        showMeTheMain();
    }

    @Override
    public void showMeTheMain() {
        System.out.println("not main anymore " + a);
    }
}
```

## Solution

Original question had `System.out.println("not main anymore " + a.toUpperCase());`, but example in this post is more interesting.

The result is:

```text
not main anymore null
not main anymore qwerty
```

Why? In the constructor of base class we try to execute overridden version of `showMeTheMain`, but `a` is not initialized yet.

This is how program is executed:

* Constructor of `ClassMain`
* Method `ClassA.showMeTheMain`
* Constructor of `ClassA` (where `a` is initialized)

### `private` vs `private final`

If we change `private String a = "qwerty";` to `private final String a = "qwerty";` we get:

```text
not main anymore qwerty
not main anymore qwerty
```

### `private` vs `private final` and initialize in constructor.

If we change `private String a = "qwerty";` to `private final String a;` and initialize in the constructor we should get again:

```text
not main anymore null
not main anymore qwerty
```

Note: In this example we changed access qualification from protected to public. We can increase access qualification, but we cannot make it more restrict.
