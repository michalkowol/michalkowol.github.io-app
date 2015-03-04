public interface Fruit {
    void eat();
    String getName();
}

public interface Peelable {
    void peel();
}

public class Apple implements Fruit, Peelable {
    public void peel() { }
    public void eat() { }
    String getName() { return "apple"; }
}

public class Peeler {
    private final Peelable peelable;
 
    public Peeler(Peelable peelable) {
        this.peelable = peelable;
    }
}

public class Juicer {
    private final Peelable peelable;
    private final Peeler peeler;
 
    public Juicer(Peelable peelable, Peeler peeler) {
        this.peelable = peelable;
        this.peeler = peeler;
    }
}