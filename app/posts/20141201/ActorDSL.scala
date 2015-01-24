import akka.actor.ActorDSL._
 
val a = actor(new Act {
  become {
    case "hello" => sender() ! "hi"
  }
})