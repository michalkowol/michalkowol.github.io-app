+++
draft = false
date = "2013-12-05"
title = "Java with Spring"
description = "How to use Spring for Dependency Injection. XML Beans. Different DI scopes."
categories = ["development", "java"]
tags = ["development", "java", "spring", "bean"]
+++

## Simple example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
 
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
 
    <bean id="apple" class="Apple" />
    <bean id="juicer" class="Juicer">
        <constructor-arg ref="apple" />
        <constructor-arg ref="peeler" />
    </bean>
    <bean id="peeler" class="Peeler">
        <constructor-arg ref="apple" />
    </bean>
</beans>
```


```xml
<!-- ... -->
<bean id="juicer" class="Juicer" scope="prototype">
<!-- ... -->
```

```java
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
```

```java
public class MainAppPrototype {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans_prototype.xml");
        Juicer j1 = context.getBean(Juicer.class);
        Juicer j2 = context.getBean(Juicer.class);
        System.out.println(j1 == j2);
    }
}
```

```java
public class MainAppSingleton {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        Juicer j1 = context.getBean(Juicer.class);
        Juicer j2 = context.getBean(Juicer.class);
        System.out.println(j1 == j2);
    }
}
```

`MainAppSingleton` execution result: `true`.

`MainAppPrototype` execution result: `false`.

## Resolving conflicts in constructor's arguments.

```xml
<bean id="test" class="Test">
    <constructor-arg value="xhajs" />
    <constructor-arg value="md5" />
</bean>
```

```xml
<bean id="test" class="Test">
    <constructor-arg name="password" value="xhajs" />
    <constructor-arg value="md5" />
</bean>
```

```java
public class Test {
 
    private String type;
    private String password;
 
    public Test(String type, String password) {
        this.type = type;
        this.password = password;
    }
     
    public String getPassword() {
        return password;
    }
     
    public String getType() {
        return type;
    }
}
```

With `bean1.xml`:
```
Test.type = xhajs
Test.password= md5
```

With `bean2.xml`:
```
Test.type = md5
Test.password= xhajs
```

## Factories

```xml
<?xml version="1.0" encoding="UTF-8"?>
 
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
 
    <bean id="fruit" class="Fruits" factory-method="newBanana" />
</beans>
```

```java
public interface Fruit {
    void eat();
    String getName();
}
```

```java
public final class Fruits {
 
    private Fruits() {
    }
     
    public static Fruit createFruit(String fruitName) {
        if (fruitName.equals("banana")) {
            return newBanana();
        } else {
            return newPlum("defaultName");
        }
    }
     
    public static Fruit newBanana() {
        return new Banana();
    }
     
    public static Fruit newPlum(String name) {
        return new Plum(name);
    }
     
    private static class Banana implements Fruit {
 
        public void eat() {
            System.out.println("Eating a banana: omomom");
        }
 
        public String getName() {
            return "banana";
        }
    }
     
    private static class Plum implements Fruit {
 
        private String name;
 
        public Plum(String name) {
            this.name = name;
        }
 
        public void eat() {
            System.out.println(String.format("Eating a plum %s: omomom", name) );
        }
 
        public String getName() {
            return "plum";
        }
    }
}
```

```java
public class MainApp {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        Fruit fruit = context.getBean(Fruit.class);
        fruit.eat();
    }
}
```

Result:

```
Eating a banana: omomom
```

Plum with name:

```xml
<bean id="fruit" class="Fruits" factory-method="newPlum">
    <constructor-arg value="sliwka"></constructor-arg>
</bean>
```

Result:

```
Eating a plum sliwka: omomom
```

Plum by name using createFruit method:

```xml
<bean id="fruit" class="Fruits" factory-method="createFruit">
    <constructor-arg value="sliwka"></constructor-arg>
</bean>
```

Result:

```
Eating a plum defaultName: omomom
```