+++
draft = false
date = "2013-11-22"
title = "Java puzzle"
categories = ["development", "java"]
tags = ["development", "java", "puzzle"]
+++

Let's consider code bellow

```java
class ClassMain {
 
  private val mainVar = "Main"
  showMeTheMain()
 
  protected def showMeTheMain() {
    println(mainVar)
  }
}
 
class ClassA extends ClassMain {
 
  private val a = "qwerty"
  showMeTheMain()
 
  override def showMeTheMain() {
    println("not main anymore" + a.toUpperCase())
  }
}
```
Result of this code is `NullPointerException`. This is because we override method `showMeTheMain`, but we want to use `a` parameter.

This is how program is executed:

* Constructor of `ClassMain`
* Method `ClassA.showMeTheMain`
* Constructor of `ClassA`

In this example we changed access qualification from protected to public. We can increase access qualification, but we cannot make it more restrict.