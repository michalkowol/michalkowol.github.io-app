+++
draft = false
date = "2016-12-01"
title = "Simple HTTP servers in Java"
description = "How to create simple http endpoints using Java build-in solution and lightweight library/framework Spark"
categories = ["development", "java"]
tags = ["development", "java", "spark", "http", "web"]
+++

## Java build-in

Since Java SE 6, there's a builtin HTTP server in ~~Sun~~ Oracle JRE. The com.sun.net.httpserver package summary outlines the involved classes and contains examples.

```java
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import lombok.SneakyThrows;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class BootSunHttp {

    public static void main(String[] args) {
        new BootSunHttp().bootServer();
    }

    @SneakyThrows
    private void bootServer() {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/test", new SimpleHandler());
        server.setExecutor(null); // creates a default executor
        server.start();
    }

    private static class SimpleHandler implements HttpHandler {

        @Override
        public void handle(HttpExchange t) throws IOException {
            String response = "This is the response";
            t.sendResponseHeaders(200, response.length());
            OutputStream os = t.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
}
```

Noted should be that the response.length() part in their example is bad, it should have been response.getBytes().length. Even then, the getBytes() method must explicitly specify the charset which you then specify in the response header. Alas, albeit misguiding to starters, it's after all just a basic kickoff example.

As to using `com.sun.*` classes, do note that this is, in contrary to what some developers think, absolutely not forbidden by the well known FAQ [Why Developers Should Not Write Programs That Call 'sun' Packages](http://www.oracle.com/technetwork/java/faq-sun-packages-142232.html). That FAQ concerns the sun.* package (such as sun.misc.BASE64Encoder) for internal usage by the Oracle JRE (which would thus kill your application when you run it on a different JRE), not the com.sun.* package. Sun/Oracle also just develop software on top of the Java SE API themselves like as every other company such as Apache and so on. Using com.sun.* classes is only discouraged (but not forbidden) when it concerns an implementation of a certain Java API, such as GlassFish (Java EE impl), Mojarra (JSF impl), Jersey (JAX-RS impl), etc.

## Spark

```java
import spark.Request;
import spark.Response;
import spark.Route;

import static spark.Spark.get;
import static spark.Spark.port;

public class BootSparkHttp {

    private final BarHandler barHandler = new BarHandler();

    public static void main(String[] args) {
        new BootSparkHttp().run();
    }

    private void run() {
        port(8080);
        get("/hello", (request, response) -> "Hello World!");
        get("/foo/:id", this::foo);
        get("/bar/:id", barHandler);
    }

    private String foo(Request request, Response response) throws Exception {
        String id = request.params(":id");
        response.type("application/json");
        return "{\"foo\": \"" + id + "\"}";
    }

    private static class BarHandler implements Route {
        @Override
        public String handle(Request request, Response response) throws Exception {
            String id = request.params(":id");
            return "bar=" + id;
        }
    }
}
```

## References

* [simple HTTP server in Java using only Java SE API](http://stackoverflow.com/questions/3732109/simple-http-server-in-java-using-only-java-se-api)
* [Spark Framework - A tiny Java web framework](http://sparkjava.com/)