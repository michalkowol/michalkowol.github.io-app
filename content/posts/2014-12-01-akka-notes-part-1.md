+++
date = "2014-12-01"
title = "Akka (notes, part 1)"
description = "Notes from \"Fast Track to Akka\"."
categories = ["development", "scala", "jvm"]
tags = ["development", "scala", "jvm", "akka"]
+++

## Akka traits

![akka traits](/img/akka-notes/reactive-traits.svg)

Akka has 4 main traits. Those are:

* Responsive - the system responds very fast.
* Resilient - the system stays responsive in the face of failure.
* Elastic - the system stays responsive under varying workload. You can easily add/remove nodes (machines) to/from system.
* Message Driven - object talks through messages. Objects are loosely coupled. There is a big diffrence between event and message - every message has recipient address, but events don't have to have it.

Please see [Reactive Manifesto](http://www.reactivemanifesto.org/) for more information.

## Concurrency vs parallelism

* Definition 1
  * **Concurrency** is when two tasks can start, run, and complete in overlapping time periods. It doesn't necessarily mean they'll ever both be running at the same instant. Eg. multitasking on a single-core machine.
  * **Parallelism** is when tasks literally run at the same time, eg. on a multicore processor.
* Definition 2
  * **Concurrency** A condition that exists when at least two threads are making progress. A more generalized form of parallelism that can include time-slicing as a form of virtual parallelism.
  * **Parallelism** A condition that arises when at least two threads are executing simultaneously.

Ref: [stackoverflow.com](http://stackoverflow.com/questions/1050222/concurrency-vs-parallelism-what-is-the-difference).

Example

* Concurrency - two queues, one coffee machine
* Parallelism - two queues, two coffee machines

![Concurrency vs Parallelism](/img/akka-notes/con_and_par.jpg)

Source: [joearms.github.io](http://joearms.github.io/2013/04/05/concurrent-and-parallel-programming.html).

## Actor, ActorRef

![Actor with Mailbox](/img/akka-notes/actor-ref.png)

* Each actor has dispatcher and mailbox.
* If we send message to actor, it will add message to its mailbox and it will return **immediately** - this is not blocking operation.
* If we create actor, `actorOf` will return **immediately** `ActorRef`. It does not wait to create an instance. If we send messages to actor that is "not started", messages will be added to mailbox and will be processed when actor is inicialized - we will not lose any message.
* `Dispatcher` assigns (schedules) thread to process the message.
* Many actors have the same dispatcher - it is some kind of thread pool.
* One message is passed to the actor
* Only **one** thread can be in **receive** block ("single-threaded illusion").
* Actors could have mutable state (but rember not to share mutable state!).
* Messages must be immutable.

## How to handle "unhandled" messages

If in receive block we do not handle some message, this message will be dropped (and maybe logged). We can use `unhandled` method to do something with messages not handled in receive block.

```scala
override def unhandled(message: Any): Unit = ???
```

## Top-Level Actor

If you create top-level actors, use factory methods - it will simplify testing. Always give name to your top-level actors.

```scala
val topLevelActor = createTopLevelActor()
def createTopLevelActor(): ActorRef = system.actorOf(TopLevel.props, "top-level")
```

## Message protocol

* Defince your message protocol in the companion object of the actor.
* If you use message protocol from other actor, use actor name as prefix to this message - this will make code more readable.

```scala
object FooActor {
  case object FooMessage
}
class FooActor extends Actor {
  import FooActor._
  override def receive: Receive = {
    case FooMessage => ???
    case BarActor.BarMessage => ???
  }
}

object BarActor {
  case object BarMessage
}
class BarActor extends Actor {
  import BarActor._
  override def receive: Receive = {
    case FooActor.FooMessage => ???
    case BarMessage => ???
  }
}
```

## Actor DSL

To create anonymous actoes we can use [Actor DSL](http://doc.akka.io/docs/akka/2.3.0-RC1/scala/actordsl.html). Here, `actor` takes the role of either `system.actorOf` or `context.actorOf`. It takes an implicit `ActorRefFactory` and creates the new `Actor`.

```scala
import akka.actor.ActorDSL._
 
val a = actor(new Act {
  become {
    case "hello" => sender() ! "hi"
  }
})
```

## Best practices

* Always create `Props` factory - the best place for that is in companion object (see: [Actors â€” Akka Documentation](http://doc.akka.io/docs/akka/snapshot/scala/actors.html)).
* Put Companion Object before you class.
* Use `sender()` **with** parentheses. It is function, not val and you have to rember about it. It can be very tricky when `sender()` will be execute in other thread - in example in `Future`.

Example:

```scala
class WrongWayActor extends Actor {
  override def receive: Receive = {
    case _ => Future {
      val result = doSomeHeavyComputation
      sender() ! result // if you reacive other message in meantime, it will send the response to WRONG actor
    }
  }
}
 
class GoodWayActor extends Actor {
  override def receive: Receive = {
    case _ =>
      val originalSender = sender()
      Future {
        val result = doSomeHeavyComputation
        originalSender ! result  // it closes clouser over - it will send response to right actor
    }
  }
}
```