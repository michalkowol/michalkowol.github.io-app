public class MainApp {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        Fruit fruit = context.getBean(Fruit.class);
        fruit.eat();
    }
}