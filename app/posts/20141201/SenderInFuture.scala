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