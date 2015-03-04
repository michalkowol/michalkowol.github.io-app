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