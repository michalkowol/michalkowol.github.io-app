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