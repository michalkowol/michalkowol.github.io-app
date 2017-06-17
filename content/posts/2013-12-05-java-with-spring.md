+++
date = "2013-12-05"
title = "Java with Spring"
description = "How to use Spring for Dependency Injection."
categories = ["development", "java", "jvm"]
tags = ["development", "java", "jvm", "spring", "bean"]
+++

## Overview

Post bellow refers to the old version of Spring. In modern Spring application you don't need to write xml files. You can do almost everything from java code.

## Example

```java
interface Fruit {
    String eat();

    String getName();
}

interface Peelable {
    String peel();
}

interface PeelableFruit extends Fruit, Peelable {
}

class Apple implements PeelableFruit {
    @Override
    public String peel() {
        return "peeling " + getName();
    }

    @Override
    public String eat() {
        return "omnonnom " + getName();
    }

    @Override
    public String getName() {
        return "apple";
    }
}

class Peeler {
    String peel(Peelable peelable) {
        return peelable.peel() + " with peeler";
    }
}

class Juicer {
    private final Peeler peeler;
    private final PeelableFruit fruit;

    public Juicer(Peeler peeler, PeelableFruit fruit) {
        this.peeler = peeler;
        this.fruit = fruit;
    }

    public String makeJuice() {
        return peeler.peel(fruit) + "\n" +
            "squeezing " + fruit.getName() + "\n" +
            "Ready!";
    }
}

```

`Boot` for examples with xml files:

```java
class Boot {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        Juicer j1 = context.getBean(Juicer.class);
        Juicer j2 = context.getBean(Juicer.class);
        System.out.println(j1 == j2);
    }
}
```

And `Boot` for new way:

```java
@SpringBootApplication
class Boot {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(Boot.class, args);
        Juicer j1 = context.getBean(Juicer.class);
        Juicer j2 = context.getBean(Juicer.class);
        System.out.println(j1 == j2);
    }
}
```

### Singletion scope

Default scope is `singleton`. If you want to use other scopes you need to use annotation `@Scope`.

#### The old, xml-ish way

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
    <bean id="peeler" class="Peeler"/>
    
</beans>
```

#### The new way

```java
@Configuration
class AppConfig {
    @Bean
    PeelableFruit fruit() {
        return new Apple();
    }

    @Bean
    Peeler peeler() {
        return new Peeler();
    }

    @Bean
    Juicer juicer(Peeler peeler, PeelableFruit fruit) {
        return new Juicer(peeler, fruit);
    }
}
```

#### Result

Result of running `Boot` is `true`. This is because we alwyas get the same instance (the same addedss in memory) of `Juicer`.

### Prototype scope

#### The old, xml-ish way

```xml
<?xml version="1.0" encoding="UTF-8"?>
 
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
 
    <bean id="apple" class="Apple" />
    <bean id="juicer" class="Juicer" scope="prototype">
        <constructor-arg ref="apple" />
        <constructor-arg ref="peeler" />
    </bean>
    <bean id="peeler" class="Peeler"/>
    
</beans>
```

#### The new way

```java
@Configuration
class AppConfig {
    @Bean
    PeelableFruit fruit() {
        return new Apple();
    }

    @Bean
    Peeler peeler() {
        return new Peeler();
    }

    @Bean
    @Scope("prototype")
    Juicer juicer(Peeler peeler, PeelableFruit fruit) {
        return new Juicer(peeler, fruit);
    }
}
```

#### Result

Result of running `Boot` is `false`. This is because we alwyas get the new instances of `Juicer`.

## Resolving conflicts in constructor's arguments.

```java
class PasswordWithType {
    private String type;
    private String password;

    PasswordWithType(String type, String password) {
        this.type = type;
        this.password = password;
    }

    String getPassword() {
        return password;
    }

    String getType() {
        return type;
    }
}
```

### The old, xml-ish way

```xml
<bean id="test" class="Test">
    <constructor-arg name="password" value="xhajs" />
    <constructor-arg value="md5" />
</bean>
```

```java
class Boot {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        PasswordWithType passwordWithType = context.getBean(PasswordWithType.class);
        System.out.println("type=" + passwordWithType.getType());
        System.out.println("password=" + passwordWithType.getPassword());
    }
}
```

And result:

```text
type = md5
password= xhajs
```

Note that we used `name` attribute in the xml. If didn't use, we would end `type = xhajs`.

### The new way

```java
@Configuration
class AppConfig {
    @Bean
    String type() {
        return "md5";
    }

    @Bean
    String password() {
        return "xhajs";
    }

    @Bean
    PasswordWithType PasswordWithType(String type, String password) {
        return new PasswordWithType(type, password);
    }
}
```

```java
@SpringBootApplication
class Boot {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(Boot.class, args);
        PasswordWithType passwordWithType = context.getBean(PasswordWithType.class);
        System.out.println("type=" + passwordWithType.getType());
        System.out.println("password=" + passwordWithType.getPassword());
    }
}
```

And result:

```text
type = md5
password= xhajs
```

If we use java to configure our app we do not have to use names. Spring is smart enought to figure it out base on name of the methods in `@Configurotion` classes.

If we want tou specify specific name we could use `javax.inject.Named` annotation - example `@Named("type")`. We need to add that dependency:

```gradle
compile 'javax.inject:javax.inject:1'
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

```text
Eating a banana: omomom
```

Plum with name:

```xml
<bean id="fruit" class="Fruits" factory-method="newPlum">
    <constructor-arg value="sliwka"></constructor-arg>
</bean>
```

Result:

```text
Eating a plum sliwka: omomom
```

Plum by name using createFruit method:

```xml
<bean id="fruit" class="Fruits" factory-method="createFruit">
    <constructor-arg value="sliwka"></constructor-arg>
</bean>
```

Result:

```text
Eating a plum defaultName: omomom
```