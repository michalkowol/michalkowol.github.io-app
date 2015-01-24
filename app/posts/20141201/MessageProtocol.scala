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