+++
draft = false
date = "2014-11-28"
title = "Scala (notes)"
description = "Notes from \"Fast Track to Scala\"."
categories = ["development", "scala"]
tags = ["development", "scala"]
+++

### Functions without parameters

```scala
def foo: String = ???
def bar(): String = ???
```

The first one is better, bacause you can easly replace it with `val`. In fact, otheres developers shouldn't know if you use `val` or `def`. It should be transparent (you shouldn't use parentheses).

### Default parameters

```scala
class Welcome(message: String = "default")
```

### Public API

If we define public API, all methods and parameters should have explicite type.

### Operators

```scala
1 + 3 == (1).+(3)
!true == true.unary_!
```

To be consisten:

* all operators like `+`, `!`, `-`, etc. should be used with infix notation,
* in other cases we **should** use dot notation.

### Named parameters

```
case class User(name: String, lastname: String)
User(name = "Michal", lastname = "Kowol") == User(lastname = "Kowol", name = "Michal") // true
```

When we have a lot of parameters (especially with the same type - integers and strings), we should used named parameters. It makes code more readable and more expressible.

### Imports in code's block are ok

If you need specific import only in one function, import it in function body.

### Private access modifiers in Scala

```scala
package com.michal

class A {
  private def defaultPrivate = ???
  private [this] def superPrivate(other: A) {
    //other.superPrivate(this) // error
    other.defaultPrivate
    superPrivate(other)
  }
  private [michal] def publicInPackage = ???
}
```

```scala
package com.michal

class B {
  def test(a: A) = {
    a.publicInPackage
  }
}
```

```scala
package com

import com.michal.A

class C {
  def test(a: A) {
    // a.publicInPackage
  }
}
```

`private [this]` is very restrict. It can be be called only in "this". You can use package access modifier (it could be good for tests).

### Should I extend `App` or should I use `main(args: Array[String])`?

Extending `App` is code for prototyping. In production you should use `main`. Why?

* Whole object body is treatead as main,
* you don't hava access to args,
* <blockquote>It should be noted that this trait is implemented using the DelayedInit functionality, which means that fields of the object will not have been initialized before the main method has been executed.</blockquote>

### `copy` method in case classes

```scala
case class User(name: String, age: Int)
User(name = "Bob", age = 10).copy(age = 40) // User(Bob, 40)
```

### List vs Vector

#### List

List has only pointer to first element - it adds very fast to head of list. To add element to end of list it has to iterate throught all elements (`O(n)`).

#### Vector

All operations are constant in time (even putting element in the middile of collection).

##### Performance characteristics

![performance characteristics](/img/scala-notes/performance.png)

[Performance characteristics](Performance characteristics)

### `Seq` is mutable!

```scala
val s = Array(1 ,2, 3) // s: Array[Int] = Array(1, 2, 3)
def testCase(s: Seq[Int]) = s // testCase: TestCase[](val s: Seq[Int]) => Seq[Int]
testCase(s) // res0: Seq[Int] = WrappedArray(1, 2, 3)
s(0) = 7 // res1: Unit = ()
testCase(s) // res2: Seq[Int] = WrappedArray(7, 2, 3)
```

There is at least one mutable subtype of `Seq`: `WrappedArray`. To be sure sequence is immutable use `scala.collection.immutable.Seq`.

### Future

```scala
import scala.concurrent.{Await, Future}
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global

def ageNextYear(currentAge: Int): Future[Int] = {
  Future { currentAge + 1 }
}

def welcome(name: String, age: Int): Future[String] = {
  Future { s"$name $age" }
}

val f = for {
  age <- ageNextYear(25)
  message <- welcome("Michal", age)
} yield s"$message nextYear: $age"

Await.result(f, 1.second) // Michal 26 nextYear: 26
```

`Await.result` is blocking operation.

### Diffrence between `=` and `<-` in for comprehension

```scala
val a = Some(2)
val b = Some(3)

for {
  v1 <- a
  v2 <- b //v2 is Int
} yield v1 + v2

for {
  v1 <- a
  v2 = b // v2 is Option[Int]
} yield v1 // + v2
```

`<-` will "unpack", `=` is simple assigment.

### `Try` object/trait

```scala
import scala.util.Try

val s = Try("100".toInt) // Success(100)
val f = Try("michal".toInt) // Failure(java.lang.NumberFormatException ...)

s.map(_ + 200) // Success(300)
f.map(_ + 200) // Failure(java.lang.NumberFormatException ...)
```

In [scalactic](http://www.scalactic.org/) you can use `String Or ErrorMessage` (`Good(...)`, `Bad(...)` subclasses).

### `if` in for-comprehension

```scala
var ll = List(List(1, 2, 3), List(2, 3), List(1), List(9), List(11, 1))

for {
  l <- ll
  e <- l if l.contains(1)
} yield e // List(1, 2, 3, 1, 11, 1)
```

You can use `if` in for-comprehension.
Every for-comprehension can be replaced with `flatMap` and `map` (outer iteration is `flatMap`).

### `filter` vs `withFilter`

`filter` always returns collections. `withFilter` returns generator. You can "join" join many generators.

You should `withFilter` when you have many filters.

### Class modifiers

* `final class Animal` you cannnot extend Animal
* `sealed` all subtypes must be defined in this file. `sealed` should be define when you use [ADT (algebraic data types)](http://en.wikipedia.org/wiki/Algebraic_data_type). `sealed` is very helpfull in pattern matching.

### Traits linearization

```scala
trait A {
  def m: String
}
trait B extends A {
  override def m: String = "b"
  def b = "b"
}
trait C extends A {
  override def m: String = "c"
  def c = "c"
}

class BC extends B with C
class CB extends C with B

new BC().m // c
new CB().m // b
```

### Const Pattern Mattching

```scala
def pattern(value: String, consToMatch: String): String = {
  val a = "1"
  val b = "2"
  value match {
    case `a` => "one"
    case `b` => "two"
    case `consToMatch` => "!!!"
    case _ => "???"
  }
}

pattern("1", "3") // one
pattern("3", "3") // !!!
pattern("3", "xxx") // ???
```

### Others

* In subclass you can replace `def` with `val`.
* There is type `Either` and `Options` - very usefull to handle errors or null pointers.
* `lazy val` can caused some problems. Instead of `lazy val` maybe yhou should use `def`.
* `s"..."` - string interpolation, `f"..."` - formating (`f"$value%02x"` (300 -> 12c)).
* `trait` or `abstract class`? In most cases `trait` is better. The only reason to use `abstract class` is when we have to use constructor params.
* If we ovverride method, it should call `super`.
* It is better to use simple `case classes` than `Tuple`.