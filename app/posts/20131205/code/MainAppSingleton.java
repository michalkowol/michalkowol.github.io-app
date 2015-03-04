public class MainAppSingleton {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        Juicer j1 = context.getBean(Juicer.class);
        Juicer j2 = context.getBean(Juicer.class);
        System.out.println(j1 == j2);
    }
}